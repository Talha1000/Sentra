import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.api.v1.endpoints.auth import require_current_user
from app.models.user import User
from app.models.decision import Project, Decision, AIRecommendation
from app.models.audit import AuditLog
from app.schemas.decision import (
    ProjectCreate,
    ProjectResponse,
    DecisionCreate,
    DecisionResponse,
    DecisionCommit,
    SimulationRequest,
)
from app.services.inventory_evaluator import InventoryEvaluator
from app.services.ai_provider import get_ai_provider

router = APIRouter()

@router.get("/projects", response_model=List[ProjectResponse])
async def list_projects(
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Project).where(Project.organization_id == user.organization_id)
    res = await db.execute(stmt)
    return res.scalars().all()

@router.post("/projects", response_model=ProjectResponse)
async def create_project(
    project_in: ProjectCreate,
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    project = Project(
        organization_id=user.organization_id,
        created_by=user.id,
        title=project_in.title,
        description=project_in.description,
        domain=project_in.domain,
    )
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project

@router.get("", response_model=List[DecisionResponse])
async def list_decisions(
    project_id: Optional[str] = None,
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Decision).join(Project).where(Project.organization_id == user.organization_id)
    if project_id:
        stmt = stmt.where(Decision.project_id == project_id)
    res = await db.execute(stmt)
    return res.scalars().all()

@router.post("", response_model=DecisionResponse)
async def create_decision(
    decision_in: DecisionCreate,
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Verify project belongs to organization
    p_stmt = select(Project).where(
        Project.id == decision_in.project_id,
        Project.organization_id == user.organization_id,
    )
    p_res = await db.execute(p_stmt)
    project = p_res.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found or unauthorized.")

    decision = Decision(
        project_id=project.id,
        created_by=user.id,
        title=decision_in.title,
        problem_statement=decision_in.problem_statement,
        domain=decision_in.domain,
        parameters_json=json.dumps(decision_in.parameters),
        constraints_json=json.dumps(decision_in.constraints),
        status="draft",
    )
    db.add(decision)
    await db.commit()
    await db.refresh(decision)
    return decision

@router.get("/{id}")
async def get_decision_detail(
    id: str,
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Decision).join(Project).where(
        Decision.id == id,
        Project.organization_id == user.organization_id,
    )
    res = await db.execute(stmt)
    decision = res.scalar_one_or_none()
    if not decision:
        raise HTTPException(status_code=404, detail="Decision not found.")

    # Fetch recommendations
    rec_stmt = select(AIRecommendation).where(AIRecommendation.decision_id == decision.id)
    rec_res = await db.execute(rec_stmt)
    recs = rec_res.scalars().all()

    return {
        "id": decision.id,
        "project_id": decision.project_id,
        "title": decision.title,
        "problem_statement": decision.problem_statement,
        "domain": decision.domain,
        "parameters": json.loads(decision.parameters_json),
        "constraints": json.loads(decision.constraints_json),
        "status": decision.status,
        "selected_alternative": decision.selected_alternative,
        "human_action_value": decision.human_action_value,
        "human_rationale": decision.human_rationale,
        "recommendations": [
            {
                "id": r.id,
                "model_provider": r.model_provider,
                "model_version": r.model_version,
                "suggested_value": r.suggested_value,
                "confidence_score": r.confidence_score,
                "rationale": r.rationale,
                "uncertainty": json.loads(r.uncertainty_json),
                "evidence": json.loads(r.evidence_json),
                "assumptions": json.loads(r.assumptions_json),
                "limitations": json.loads(r.limitations_json),
            }
            for r in recs
        ],
    }

@router.post("/{id}/simulate")
async def run_simulation(
    id: str,
    sim_in: SimulationRequest,
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Executes what-if Monte Carlo simulation for inventory purchasing.
    """
    expected_profit = InventoryEvaluator.simulate_expected_profit(
        purchase_quantity=sim_in.purchase_quantity,
        mean_demand=sim_in.mean_demand,
        std_demand=sim_in.std_demand,
        current_stock=sim_in.current_stock,
        unit_cost=sim_in.unit_cost,
        selling_price=sim_in.selling_price,
        salvage_value=sim_in.salvage_value,
        stockout_penalty=sim_in.stockout_penalty,
        n_simulations=sim_in.n_simulations,
    )

    # Detailed deterministic single-demand payoff at mean demand
    payoff = InventoryEvaluator.calculate_payoff(
        purchase_quantity=sim_in.purchase_quantity,
        realized_demand=sim_in.mean_demand,
        current_stock=sim_in.current_stock,
        unit_cost=sim_in.unit_cost,
        selling_price=sim_in.selling_price,
        salvage_value=sim_in.salvage_value,
        stockout_penalty=sim_in.stockout_penalty,
    )

    return {
        "purchase_quantity": sim_in.purchase_quantity,
        "expected_mean_profit": round(expected_profit, 2),
        "deterministic_payoff_at_mean": payoff,
    }

@router.post("/{id}/recommend")
async def request_ai_recommendation(
    id: str,
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Decision).join(Project).where(
        Decision.id == id,
        Project.organization_id == user.organization_id,
    )
    res = await db.execute(stmt)
    decision = res.scalar_one_or_none()
    if not decision:
        raise HTTPException(status_code=404, detail="Decision not found.")

    provider = get_ai_provider()
    params = json.loads(decision.parameters_json)
    constraints = json.loads(decision.constraints_json)

    rec_data = await provider.generate_recommendation(
        problem_statement=decision.problem_statement,
        domain=decision.domain,
        parameters=params,
        constraints=constraints,
    )

    rec = AIRecommendation(
        decision_id=decision.id,
        model_provider=rec_data.get("model_provider", "openai"),
        model_version=rec_data.get("model_version", "gpt-4o"),
        suggested_value=rec_data.get("suggested_value", 0.0),
        confidence_score=rec_data.get("confidence_score", 0.85),
        rationale=rec_data.get("rationale", ""),
        uncertainty_json=json.dumps(rec_data.get("uncertainty", {})),
        evidence_json=json.dumps(rec_data.get("evidence", [])),
        assumptions_json=json.dumps(rec_data.get("assumptions", [])),
        limitations_json=json.dumps(rec_data.get("limitations", [])),
    )
    db.add(rec)
    await db.commit()
    await db.refresh(rec)
    return rec_data

@router.post("/{id}/commit")
async def commit_human_decision(
    id: str,
    commit_in: DecisionCommit,
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Decision).join(Project).where(
        Decision.id == id,
        Project.organization_id == user.organization_id,
    )
    res = await db.execute(stmt)
    decision = res.scalar_one_or_none()
    if not decision:
        raise HTTPException(status_code=404, detail="Decision not found.")

    decision.selected_alternative = commit_in.selected_alternative
    decision.human_action_value = commit_in.human_action_value
    decision.human_rationale = commit_in.human_rationale
    decision.status = "committed"

    # Audit Log
    audit = AuditLog(
        organization_id=user.organization_id,
        actor_id=user.id,
        actor_email=user.email,
        action="COMMIT_DECISION",
        entity_type="decision",
        entity_id=decision.id,
        payload_json=json.dumps({
            "action_value": commit_in.human_action_value,
            "rationale": commit_in.human_rationale,
            "alternative": commit_in.selected_alternative,
        }),
    )
    db.add(audit)
    await db.commit()
    return {"status": "success", "decision_id": decision.id, "committed_at": str(decision.updated_at)}
