import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.api.v1.endpoints.auth import get_current_user, require_current_user
from app.models.user import User
from app.models.experiment import (
    Experiment,
    ExperimentCondition,
    Scenario,
    ParticipantSession,
    DecisionEvent,
)
from app.schemas.experiment import (
    ExperimentCreate,
    ParticipantJoinRequest,
    ParticipantSessionResponse,
    DecisionEventSubmit,
    DecisionEventResponse,
)
from app.services.experiment_service import ExperimentService

router = APIRouter()

@router.get("")
async def list_experiments(
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Experiment).where(Experiment.organization_id == user.organization_id)
    res = await db.execute(stmt)
    experiments = res.scalars().all()
    return experiments

@router.post("")
async def create_experiment(
    exp_in: ExperimentCreate,
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    exp = Experiment(
        organization_id=user.organization_id,
        created_by=user.id,
        title=exp_in.title,
        hypothesis=exp_in.hypothesis,
        protocol_type=exp_in.protocol_type,
        status="active",
    )
    db.add(exp)
    await db.commit()
    await db.refresh(exp)
    return exp

@router.get("/{id}")
async def get_experiment_detail(
    id: str,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Experiment).where(Experiment.id == id)
    res = await db.execute(stmt)
    exp = res.scalar_one_or_none()
    if not exp:
        raise HTTPException(status_code=404, detail="Experiment not found.")

    c_stmt = select(ExperimentCondition).where(ExperimentCondition.experiment_id == exp.id)
    c_res = await db.execute(c_stmt)
    conditions = c_res.scalars().all()

    s_stmt = select(Scenario).where(Scenario.experiment_id == exp.id).order_by(Scenario.order_index)
    s_res = await db.execute(s_stmt)
    scenarios = s_res.scalars().all()

    return {
        "id": exp.id,
        "title": exp.title,
        "hypothesis": exp.hypothesis,
        "protocol_type": exp.protocol_type,
        "status": exp.status,
        "conditions": [
            {
                "id": c.id,
                "code": c.code,
                "name": c.name,
                "description": c.description,
                "ai_assistance_mode": c.ai_assistance_mode,
            }
            for c in conditions
        ],
        "scenarios": [
            {
                "id": s.id,
                "order_index": s.order_index,
                "title": s.title,
                "domain": s.domain,
                "parameters": json.loads(s.parameters_json),
                "ground_truth_optimal_value": s.ground_truth_optimal_value,
                "ai_suggested_value": s.ai_suggested_value,
                "ai_confidence_score": s.ai_confidence_score,
                "ai_explanation": s.ai_explanation,
                "is_injected_bias": s.is_injected_bias,
            }
            for s in scenarios
        ],
    }

@router.post("/{id}/join", response_model=ParticipantSessionResponse)
async def join_experiment(
    id: str,
    join_in: ParticipantJoinRequest,
    current_user: Optional[User] = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Participant registration & consent flow.
    Performs server-side balanced randomized condition assignment.
    """
    user_id = current_user.id if current_user else None
    session = await ExperimentService.assign_participant_condition(db, id, user_id=user_id)

    c_stmt = select(ExperimentCondition).where(ExperimentCondition.id == session.condition_id)
    c_res = await db.execute(c_stmt)
    condition = c_res.scalar_one()

    return {
        "id": session.id,
        "experiment_id": session.experiment_id,
        "condition_id": session.condition_id,
        "condition_code": condition.code,
        "ai_assistance_mode": condition.ai_assistance_mode,
        "pseudonym_token": session.pseudonym_token,
        "consent_confirmed": session.consent_confirmed,
        "status": session.status,
    }

@router.get("/sessions/{sessionId}")
async def get_participant_session(
    sessionId: str,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(ParticipantSession).where(ParticipantSession.id == sessionId)
    res = await db.execute(stmt)
    session = res.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Participant session not found.")

    c_stmt = select(ExperimentCondition).where(ExperimentCondition.id == session.condition_id)
    c_res = await db.execute(c_stmt)
    condition = c_res.scalar_one()

    # Fetch scenarios
    s_stmt = select(Scenario).where(Scenario.experiment_id == session.experiment_id).order_by(Scenario.order_index)
    s_res = await db.execute(s_stmt)
    scenarios = s_res.scalars().all()

    # Fetch already completed events
    e_stmt = select(DecisionEvent).where(DecisionEvent.session_id == session.id)
    e_res = await db.execute(e_stmt)
    events = e_res.scalars().all()
    completed_scenario_ids = [e.scenario_id for e in events]

    # Present scenarios formatted according to condition blinding rules:
    # If Condition A (none): strip AI suggested value and explanation
    # If Condition B (rec only): include AI suggested value but strip explanation
    # If Condition C (rec+explanation): include full AI payload
    sanitized_scenarios = []
    for s in scenarios:
        params = json.loads(s.parameters_json)
        sc_data = {
            "id": s.id,
            "order_index": s.order_index,
            "title": s.title,
            "domain": s.domain,
            "parameters": params,
            "is_completed": s.id in completed_scenario_ids,
        }

        if condition.ai_assistance_mode == "none":
            sc_data["ai_assistance"] = None
        elif condition.ai_assistance_mode == "recommendation_only":
            sc_data["ai_assistance"] = {
                "suggested_value": s.ai_suggested_value,
                "confidence_score": s.ai_confidence_score,
                "explanation": None,
            }
        else:  # recommendation_with_explanation
            sc_data["ai_assistance"] = {
                "suggested_value": s.ai_suggested_value,
                "confidence_score": s.ai_confidence_score,
                "explanation": s.ai_explanation,
            }

        sanitized_scenarios.append(sc_data)

    return {
        "id": session.id,
        "experiment_id": session.experiment_id,
        "condition_code": condition.code,
        "condition_name": condition.name,
        "ai_assistance_mode": condition.ai_assistance_mode,
        "pseudonym_token": session.pseudonym_token,
        "status": session.status,
        "completed_count": len(completed_scenario_ids),
        "total_count": len(scenarios),
        "scenarios": sanitized_scenarios,
    }

@router.post("/sessions/{sessionId}/events", response_model=DecisionEventResponse)
async def submit_decision_event(
    sessionId: str,
    event_in: DecisionEventSubmit,
    db: AsyncSession = Depends(get_db),
):
    event = await ExperimentService.record_decision_event(
        session=db,
        session_id=sessionId,
        scenario_id=event_in.scenario_id,
        user_action_value=event_in.user_action_value,
        reaction_time_ms=event_in.reaction_time_ms,
        subjective_confidence=event_in.subjective_confidence,
    )
    return event

@router.post("/sessions/{sessionId}/complete")
async def complete_session(
    sessionId: str,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(ParticipantSession).where(ParticipantSession.id == sessionId)
    res = await db.execute(stmt)
    session = res.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found.")

    session.status = "completed"
    await db.commit()
    return {"status": "completed", "session_id": session.id}
