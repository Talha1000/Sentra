import json
import uuid
import time
from typing import Dict, Any, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.experiment import (
    Experiment,
    ExperimentCondition,
    Scenario,
    ParticipantSession,
    DecisionEvent,
)
from app.services.inventory_evaluator import InventoryEvaluator

class ExperimentService:
    """
    Orchestrates research experiments, balanced randomized assignments,
    scenario generation with ground truth, and participant session event telemetry.
    """

    @staticmethod
    async def create_default_inventory_experiment(
        session: AsyncSession,
        organization_id: str,
        user_id: Optional[str] = None,
    ) -> Experiment:
        """
        Creates a benchmark inventory purchasing experiment with 3 conditions and 5 controlled scenarios,
        including deliberate bias injection to test participant over-reliance.
        """
        experiment = Experiment(
            organization_id=organization_id,
            created_by=user_id,
            title="Human–AI Collaboration & Over-Reliance in Inventory Purchasing",
            hypothesis=(
                "Detailed AI explanations and confidence bounds improve decision accuracy in normal conditions, "
                "but increase over-reliance when the AI presents an intentionally flawed recommendation."
            ),
            protocol_type="between_subjects",
            status="active",
            randomization_seed=108,
        )
        session.add(experiment)
        await session.flush()

        # Three experimental conditions
        conditions_data = [
            {
                "code": "CONDITION_A",
                "name": "Human-Only Baseline",
                "description": "Participant receives historical sales, demand forecast stats, and cost constraints with NO AI recommendation.",
                "ai_assistance_mode": "none",
            },
            {
                "code": "CONDITION_B",
                "name": "AI Recommendation Only",
                "description": "Participant receives data plus a single suggested order quantity with no explanatory reasoning.",
                "ai_assistance_mode": "recommendation_only",
            },
            {
                "code": "CONDITION_C",
                "name": "AI Recommendation with Explanation & Confidence",
                "description": "Participant receives suggested quantity, 88% confidence interval, structured rationale, and uncertainty factors.",
                "ai_assistance_mode": "recommendation_with_explanation",
            },
        ]

        conditions = []
        for cd in conditions_data:
            cond = ExperimentCondition(
                experiment_id=experiment.id,
                code=cd["code"],
                name=cd["name"],
                description=cd["description"],
                ai_assistance_mode=cd["ai_assistance_mode"],
            )
            session.add(cond)
            conditions.append(cond)
        await session.flush()

        # 5 Scenarios with mathematical ground-truth values and controlled bias
        scenarios_data = [
            {
                "order_index": 1,
                "title": "Scenario 1: Baseline Steady Demand (Industrial Components)",
                "mean_demand": 1200.0,
                "std_demand": 180.0,
                "current_stock": 350.0,
                "unit_cost": 40.0,
                "selling_price": 85.0,
                "salvage_value": 15.0,
                "stockout_penalty": 25.0,
                "budget_limit": 50000.0,
                "inject_bias": False,
                "bias_pct": 0.0,
            },
            {
                "order_index": 2,
                "title": "Scenario 2: High Stockout Penalty & Peak Season (Consumer Electronics)",
                "mean_demand": 2400.0,
                "std_demand": 450.0,
                "current_stock": 500.0,
                "unit_cost": 65.0,
                "selling_price": 140.0,
                "salvage_value": 20.0,
                "stockout_penalty": 60.0,
                "budget_limit": 150000.0,
                "inject_bias": False,
                "bias_pct": 0.0,
            },
            {
                "order_index": 3,
                "title": "Scenario 3: Over-Reliance Test — Injected AI Over-Ordering (+35%)",
                "mean_demand": 1600.0,
                "std_demand": 300.0,
                "current_stock": 400.0,
                "unit_cost": 50.0,
                "selling_price": 90.0,
                "salvage_value": 10.0,
                "stockout_penalty": 15.0,
                "budget_limit": 80000.0,
                "inject_bias": True,  # Deliberate error injection
                "bias_pct": 0.35,
            },
            {
                "order_index": 4,
                "title": "Scenario 4: Constrained Working Capital Budget (Medical Supplies)",
                "mean_demand": 3000.0,
                "std_demand": 500.0,
                "current_stock": 600.0,
                "unit_cost": 80.0,
                "selling_price": 175.0,
                "salvage_value": 25.0,
                "stockout_penalty": 50.0,
                "budget_limit": 120000.0,  # Strict budget ceiling
                "inject_bias": False,
                "bias_pct": 0.0,
            },
            {
                "order_index": 5,
                "title": "Scenario 5: Over-Reliance Test — Injected AI Under-Ordering (-30%)",
                "mean_demand": 2100.0,
                "std_demand": 350.0,
                "current_stock": 250.0,
                "unit_cost": 30.0,
                "selling_price": 75.0,
                "salvage_value": 12.0,
                "stockout_penalty": 40.0,
                "budget_limit": 70000.0,
                "inject_bias": True,  # Deliberate error injection
                "bias_pct": -0.30,
            },
        ]

        for s in scenarios_data:
            # Deterministic mathematical calculation of optimal order
            opt_res = InventoryEvaluator.calculate_optimal_order(
                mean_demand=s["mean_demand"],
                std_demand=s["std_demand"],
                current_stock=s["current_stock"],
                unit_cost=s["unit_cost"],
                selling_price=s["selling_price"],
                salvage_value=s["salvage_value"],
                stockout_penalty=s["stockout_penalty"],
                budget_limit=s["budget_limit"],
            )

            rec_res = InventoryEvaluator.generate_research_scenario_recommendation(
                optimal_order=opt_res["optimal_order_quantity"],
                inject_bias=s["inject_bias"],
                bias_percentage=s["bias_pct"],
            )

            scenario = Scenario(
                experiment_id=experiment.id,
                order_index=s["order_index"],
                title=s["title"],
                domain="inventory",
                parameters_json=json.dumps(s),
                ground_truth_optimal_value=float(opt_res["optimal_order_quantity"]),
                ground_truth_max_payoff=float(opt_res["expected_max_profit"]),
                ai_suggested_value=float(rec_res["suggested_value"]),
                ai_confidence_score=float(rec_res["confidence_score"]),
                ai_explanation=rec_res["rationale"],
                is_injected_bias=s["inject_bias"],
                bias_percentage=s["bias_pct"],
            )
            session.add(scenario)

        await session.commit()
        await session.refresh(experiment)
        return experiment

    @staticmethod
    async def assign_participant_condition(
        session: AsyncSession,
        experiment_id: str,
        user_id: Optional[str] = None,
    ) -> ParticipantSession:
        """
        Assigns participant to condition using balanced sequential assignment
        (Latin-square / block randomization) to ensure equal distribution across A, B, and C.
        """
        # Fetch conditions
        stmt = select(ExperimentCondition).where(ExperimentCondition.experiment_id == experiment_id)
        result = await session.execute(stmt)
        conditions = result.scalars().all()

        if not conditions:
            raise ValueError("No conditions defined for experiment.")

        # Count existing sessions per condition
        counts = []
        for cond in conditions:
            c_stmt = (
                select(func.count(ParticipantSession.id))
                .where(ParticipantSession.condition_id == cond.id)
            )
            c_res = await session.execute(c_stmt)
            count = c_res.scalar() or 0
            counts.append((count, cond))

        # Select condition with minimum count (balanced assignment)
        counts.sort(key=lambda x: x[0])
        selected_condition = counts[0][1]

        participant_token = f"p-{uuid.uuid4().hex[:12]}"
        participant_session = ParticipantSession(
            experiment_id=experiment_id,
            condition_id=selected_condition.id,
            user_id=user_id,
            pseudonym_token=participant_token,
            consent_confirmed=True,
            status="in_progress",
        )
        session.add(participant_session)
        await session.commit()
        await session.refresh(participant_session)
        return participant_session

    @staticmethod
    async def record_decision_event(
        session: AsyncSession,
        session_id: str,
        scenario_id: str,
        user_action_value: float,
        reaction_time_ms: float,
        subjective_confidence: float = 0.5,
    ) -> DecisionEvent:
        """
        Records human decision event, scoring it against ground truth mathematical payoffs.
        """
        start_server_time = time.time() * 1000.0

        scenario_stmt = select(Scenario).where(Scenario.id == scenario_id)
        sc_res = await session.execute(scenario_stmt)
        scenario = sc_res.scalar_one_or_none()
        if not scenario:
            raise ValueError(f"Scenario {scenario_id} not found.")

        params = json.loads(scenario.parameters_json)

        # Calculate achieved expected profit
        achieved_payoff = InventoryEvaluator.simulate_expected_profit(
            purchase_quantity=user_action_value,
            mean_demand=params["mean_demand"],
            std_demand=params["std_demand"],
            current_stock=params["current_stock"],
            unit_cost=params["unit_cost"],
            selling_price=params["selling_price"],
            salvage_value=params["salvage_value"],
            stockout_penalty=params["stockout_penalty"],
        )

        deviation = abs(user_action_value - scenario.ground_truth_optimal_value)
        economic_loss = max(0.0, scenario.ground_truth_max_payoff - achieved_payoff)
        
        # Check agreement with AI (within 5% margin of suggested value)
        ai_val = scenario.ai_suggested_value
        agreed_with_ai = bool(abs(user_action_value - ai_val) <= max(10.0, ai_val * 0.05))
        
        # Over-reliance = agreed with AI when AI had deliberately injected bias
        over_reliance_flag = bool(agreed_with_ai and scenario.is_injected_bias)

        event = DecisionEvent(
            session_id=session_id,
            scenario_id=scenario_id,
            user_action_value=user_action_value,
            reaction_time_ms=reaction_time_ms,
            server_time_ms=start_server_time,
            subjective_confidence=subjective_confidence,
            ground_truth_deviation=round(deviation, 2),
            payoff_achieved=round(achieved_payoff, 2),
            economic_loss=round(economic_loss, 2),
            agreed_with_ai=agreed_with_ai,
            over_reliance_flag=over_reliance_flag,
        )
        session.add(event)
        await session.commit()
        await session.refresh(event)
        return event
