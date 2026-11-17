import io
import csv
import json
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.experiment import (
    Experiment,
    ExperimentCondition,
    Scenario,
    ParticipantSession,
    DecisionEvent,
)
from app.services.statistical_engine import StatisticalEngine

router = APIRouter()

@router.get("/experiments/{id}/summary")
async def get_experiment_analytics_summary(
    id: str,
    db: AsyncSession = Depends(get_db),
):
    # Fetch experiment
    exp_stmt = select(Experiment).where(Experiment.id == id)
    exp_res = await db.execute(exp_stmt)
    exp = exp_res.scalar_one_or_none()
    if not exp:
        raise HTTPException(status_code=404, detail="Experiment not found.")

    c_stmt = select(ExperimentCondition).where(ExperimentCondition.experiment_id == exp.id)
    c_res = await db.execute(c_stmt)
    conditions = c_res.scalars().all()

    conditions_summary = []
    condition_samples: Dict[str, Dict[str, List[float]]] = {}

    all_confidences = []
    all_accuracies = []

    for cond in conditions:
        # Fetch sessions for this condition
        s_stmt = select(ParticipantSession).where(ParticipantSession.condition_id == cond.id)
        s_res = await db.execute(s_stmt)
        sessions = s_res.scalars().all()
        session_ids = [s.id for s in sessions]

        if not session_ids:
            conditions_summary.append({
                "condition_code": cond.code,
                "condition_name": cond.name,
                "n_participants": 0,
                "mean_deviation": 0.0,
                "mean_payoff": 0.0,
                "mean_latency_ms": 0.0,
                "agreement_rate": 0.0,
                "over_reliance_rate": 0.0,
            })
            continue

        # Fetch events for these sessions
        e_stmt = select(DecisionEvent).where(DecisionEvent.session_id.in_(session_ids))
        e_res = await db.execute(e_stmt)
        events = e_res.scalars().all()

        deviations = [e.ground_truth_deviation for e in events]
        payoffs = [e.payoff_achieved for e in events]
        latencies = [e.reaction_time_ms for e in events]
        confidences = [e.subjective_confidence for e in events]
        # Accuracy defined as normalized proximity to optimal: max(0, 1 - (deviation / 500))
        accuracies = [max(0.0, 1.0 - (e.ground_truth_deviation / 500.0)) for e in events]

        all_confidences.extend(confidences)
        all_accuracies.extend(accuracies)

        condition_samples[cond.code] = {
            "deviations": deviations,
            "payoffs": payoffs,
            "latencies": latencies,
        }

        # Event dicts for reliance metrics
        event_dicts = [
            {
                "agreed_with_ai": e.agreed_with_ai,
                "is_injected_bias": e.over_reliance_flag or (e.ground_truth_deviation > 200 and e.agreed_with_ai),
            }
            for e in events
        ]
        reliance = StatisticalEngine.compute_reliance_metrics(event_dicts)

        conditions_summary.append({
            "condition_code": cond.code,
            "condition_name": cond.name,
            "n_participants": len(sessions),
            "total_events": len(events),
            "mean_deviation": round(float(sum(deviations) / len(deviations)), 1) if deviations else 0.0,
            "mean_payoff": round(float(sum(payoffs) / len(payoffs)), 2) if payoffs else 0.0,
            "mean_latency_ms": round(float(sum(latencies) / len(latencies)), 1) if latencies else 0.0,
            "agreement_rate": reliance["overall_agreement_rate"],
            "over_reliance_rate": reliance["over_reliance_rate"],
        })

    # Statistical comparisons: Condition A (Human) vs Condition B (AI), and Condition B vs Condition C (AI+Explanation)
    comparisons = []
    if "CONDITION_A" in condition_samples and "CONDITION_B" in condition_samples:
        comp_ab = StatisticalEngine.compare_conditions(
            sample_a=condition_samples["CONDITION_A"]["payoffs"],
            sample_b=condition_samples["CONDITION_B"]["payoffs"],
            label_a="Human-Only (Cond A)",
            label_b="AI Recommendation (Cond B)",
            metric_name="Mean Payoff ($)",
        )
        comparisons.append(comp_ab)

    if "CONDITION_B" in condition_samples and "CONDITION_C" in condition_samples:
        comp_bc = StatisticalEngine.compare_conditions(
            sample_a=condition_samples["CONDITION_B"]["payoffs"],
            sample_b=condition_samples["CONDITION_C"]["payoffs"],
            label_a="AI Rec Only (Cond B)",
            label_b="AI Rec + Explanation (Cond C)",
            metric_name="Mean Payoff ($)",
        )
        comparisons.append(comp_bc)

    # Calibration curve
    calibration = StatisticalEngine.compute_trust_calibration_curve(all_confidences, all_accuracies, n_bins=5)

    return {
        "experiment_id": exp.id,
        "title": exp.title,
        "hypothesis": exp.hypothesis,
        "conditions_summary": conditions_summary,
        "comparisons": comparisons,
        "calibration": calibration,
    }

@router.get("/experiments/{id}/export")
async def export_raw_research_data(
    id: str,
    format: str = "csv",
    db: AsyncSession = Depends(get_db),
):
    """
    Exports complete anonymized trial-level research microdata for researchers.
    """
    stmt = (
        select(
            DecisionEvent.id.label("event_id"),
            ParticipantSession.pseudonym_token.label("participant_id"),
            ExperimentCondition.code.label("condition_code"),
            Scenario.order_index.label("scenario_order"),
            Scenario.is_injected_bias.label("is_injected_bias"),
            Scenario.ground_truth_optimal_value.label("optimal_order_quantity"),
            Scenario.ai_suggested_value.label("ai_suggested_quantity"),
            DecisionEvent.user_action_value.label("participant_order_quantity"),
            DecisionEvent.reaction_time_ms.label("reaction_time_ms"),
            DecisionEvent.subjective_confidence.label("subjective_confidence"),
            DecisionEvent.ground_truth_deviation.label("ground_truth_deviation"),
            DecisionEvent.payoff_achieved.label("payoff_achieved"),
            DecisionEvent.economic_loss.label("economic_loss"),
            DecisionEvent.agreed_with_ai.label("agreed_with_ai"),
            DecisionEvent.over_reliance_flag.label("over_reliance_flag"),
        )
        .join(ParticipantSession, DecisionEvent.session_id == ParticipantSession.id)
        .join(ExperimentCondition, ParticipantSession.condition_id == ExperimentCondition.id)
        .join(Scenario, DecisionEvent.scenario_id == Scenario.id)
        .where(ParticipantSession.experiment_id == id)
        .order_by(ParticipantSession.pseudonym_token, Scenario.order_index)
    )
    res = await db.execute(stmt)
    rows = res.mappings().all()

    if format == "json":
        return [dict(r) for r in rows]

    # CSV output
    output = io.StringIO()
    if rows:
        fieldnames = list(rows[0].keys())
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow(dict(r))

    csv_data = output.getvalue()
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=sentra_experiment_{id[:8]}_microdata.csv"},
    )
