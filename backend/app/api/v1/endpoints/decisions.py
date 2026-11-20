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
    QuickSimRequest,
)
from app.services.inventory_evaluator import InventoryEvaluator
from app.services.ai_provider import get_ai_provider

router = APIRouter()

@router.post("/quick-simulate")
async def quick_simulate(sim: QuickSimRequest):
    """
    Public interactive Monte Carlo simulation endpoint.
    Computes mathematical optimum, user expected profit, simulated risk metrics,
    and cognitive alignment without requiring authentication.
    """
    optimal = InventoryEvaluator.calculate_optimal_order(
        mean_demand=sim.mean_demand,
        std_demand=sim.std_demand,
        current_stock=sim.current_stock,
        unit_cost=sim.unit_cost,
        selling_price=sim.selling_price,
        salvage_value=sim.salvage_value,
        stockout_penalty=sim.stockout_penalty,
        budget_limit=sim.budget_limit,
    )
    
    user_expected_profit = InventoryEvaluator.simulate_expected_profit(
        purchase_quantity=sim.purchase_quantity,
        mean_demand=sim.mean_demand,
        std_demand=sim.std_demand,
        current_stock=sim.current_stock,
        unit_cost=sim.unit_cost,
        selling_price=sim.selling_price,
        salvage_value=sim.salvage_value,
        stockout_penalty=sim.stockout_penalty,
        n_simulations=sim.n_simulations,
    )

    opt_qty = optimal["optimal_order_quantity"]
    ai_suggested = round(opt_qty * 1.23) # Injected +23% overconfidence bias
    deviation_from_opt = abs(sim.purchase_quantity - opt_qty)
    deviation_from_ai = abs(sim.purchase_quantity - ai_suggested)

    # Payoff at mean demand
    payoff_mean = InventoryEvaluator.calculate_payoff(
        purchase_quantity=sim.purchase_quantity,
        realized_demand=sim.mean_demand,
        current_stock=sim.current_stock,
        unit_cost=sim.unit_cost,
        selling_price=sim.selling_price,
        salvage_value=sim.salvage_value,
        stockout_penalty=sim.stockout_penalty,
    )

    # Determine cognitive diagnosis
    if deviation_from_opt <= 35:
        cognitive_diagnosis = "OPTIMAL_CALIBRATED"
        verdict_badge = "Calibrated Oversight"
        verdict_explanation = "Excellent! You adjusted correctly to the mathematical critical fractile, avoiding both under-supply and AI over-confidence."
    elif deviation_from_ai <= 35:
        cognitive_diagnosis = "AI_OVER_RELIANCE"
        verdict_badge = "Uncritical AI Over-reliance"
        verdict_explanation = "Warning: You anchored heavily to the AI's recommendation (+23% skewed), incurring excessive holding and depreciation penalties."
    elif sim.purchase_quantity < opt_qty:
        cognitive_diagnosis = "RISK_AVERSE"
        verdict_badge = "Excessive Conservatism"
        verdict_explanation = "You under-ordered relative to the profit-maximizing point, leaving significant unmet customer demand and stockout penalties on the table."
    else:
        cognitive_diagnosis = "OVER_BUFFERED"
        verdict_badge = "Excessive Buffer"
        verdict_explanation = "You ordered well above the optimal fractile, unnecessarily tying up working capital in unsold inventory."

    return {
        "status": "success",
        "purchase_quantity": sim.purchase_quantity,
        "optimal_order_quantity": opt_qty,
        "ai_suggested_quantity": ai_suggested,
        "critical_fractile": optimal["critical_fractile"],
        "target_inventory_level": optimal["target_inventory_level"],
        "expected_user_profit": round(user_expected_profit, 2),
        "expected_max_profit": optimal["expected_max_profit"],
        "profit_efficiency_pct": round((user_expected_profit / optimal["expected_max_profit"]) * 100, 1) if optimal["expected_max_profit"] > 0 else 0.0,
        "deviation_from_opt": round(deviation_from_opt, 1),
        "cognitive_diagnosis": cognitive_diagnosis,
        "verdict_badge": verdict_badge,
        "verdict_explanation": verdict_explanation,
        "payoff_at_mean": payoff_mean,
    }

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
