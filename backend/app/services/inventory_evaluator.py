import math
from typing import Dict, Any, List
import numpy as np
from scipy import stats

class InventoryEvaluator:
    """
    Deterministic mathematical evaluator for inventory purchasing decisions under demand uncertainty.
    Implements classical stochastic newsvendor theory with holding, salvage, stockout penalties,
    and budget constraints.
    """

    @staticmethod
    def calculate_payoff(
        purchase_quantity: float,
        realized_demand: float,
        current_stock: float,
        unit_cost: float,
        selling_price: float,
        salvage_value: float,
        stockout_penalty: float,
    ) -> Dict[str, float]:
        """
        Calculates exact deterministic financial payoff for an order quantity given realized demand.
        """
        total_available = current_stock + purchase_quantity
        units_sold = min(total_available, realized_demand)
        unsold_inventory = max(0.0, total_available - realized_demand)
        unmet_demand = max(0.0, realized_demand - total_available)

        gross_revenue = units_sold * selling_price
        salvage_revenue = unsold_inventory * salvage_value
        purchasing_cost = purchase_quantity * unit_cost
        penalty_cost = unmet_demand * stockout_penalty

        net_profit = gross_revenue + salvage_revenue - purchasing_cost - penalty_cost

        return {
            "net_profit": round(net_profit, 2),
            "units_sold": round(units_sold, 1),
            "unsold_inventory": round(unsold_inventory, 1),
            "unmet_demand": round(unmet_demand, 1),
            "gross_revenue": round(gross_revenue, 2),
            "purchasing_cost": round(purchasing_cost, 2),
            "penalty_cost": round(penalty_cost, 2),
            "salvage_revenue": round(salvage_revenue, 2),
        }

    @staticmethod
    def calculate_optimal_order(
        mean_demand: float,
        std_demand: float,
        current_stock: float,
        unit_cost: float,
        selling_price: float,
        salvage_value: float,
        stockout_penalty: float,
        budget_limit: float,
        moq: float = 0.0,
    ) -> Dict[str, Any]:
        """
        Calculates theoretical optimal order quantity Q* using the critical fractile of newsvendor model.
        """
        underage_cost = (selling_price - unit_cost) + stockout_penalty
        overage_cost = unit_cost - salvage_value

        if underage_cost + overage_cost <= 0:
            critical_fractile = 0.5
        else:
            critical_fractile = underage_cost / (underage_cost + overage_cost)

        # Base-stock level target S* from inverse cumulative normal distribution
        target_inventory = stats.norm.ppf(critical_fractile, loc=mean_demand, scale=std_demand)
        raw_order = max(0.0, target_inventory - current_stock)

        # Apply budget constraint
        max_budget_quantity = math.floor(budget_limit / unit_cost) if unit_cost > 0 else raw_order
        budget_constrained_order = min(raw_order, max_budget_quantity)

        # Apply MOQ (Minimum Order Quantity)
        if 0 < budget_constrained_order < moq:
            # Check expected profit of ordering MOQ vs 0
            profit_at_moq = InventoryEvaluator.simulate_expected_profit(
                purchase_quantity=moq,
                mean_demand=mean_demand,
                std_demand=std_demand,
                current_stock=current_stock,
                unit_cost=unit_cost,
                selling_price=selling_price,
                salvage_value=salvage_value,
                stockout_penalty=stockout_penalty,
            )
            profit_at_zero = InventoryEvaluator.simulate_expected_profit(
                purchase_quantity=0,
                mean_demand=mean_demand,
                std_demand=std_demand,
                current_stock=current_stock,
                unit_cost=unit_cost,
                selling_price=selling_price,
                salvage_value=salvage_value,
                stockout_penalty=stockout_penalty,
            )
            final_optimal_order = moq if profit_at_moq > profit_at_zero else 0.0
        else:
            final_optimal_order = round(budget_constrained_order)

        expected_profit = InventoryEvaluator.simulate_expected_profit(
            purchase_quantity=final_optimal_order,
            mean_demand=mean_demand,
            std_demand=std_demand,
            current_stock=current_stock,
            unit_cost=unit_cost,
            selling_price=selling_price,
            salvage_value=salvage_value,
            stockout_penalty=stockout_penalty,
        )

        return {
            "optimal_order_quantity": final_optimal_order,
            "critical_fractile": round(critical_fractile, 4),
            "target_inventory_level": round(target_inventory, 1),
            "expected_max_profit": round(expected_profit, 2),
            "is_budget_constrained": bool(final_optimal_order == max_budget_quantity and max_budget_quantity < raw_order),
        }

    @staticmethod
    def simulate_expected_profit(
        purchase_quantity: float,
        mean_demand: float,
        std_demand: float,
        current_stock: float,
        unit_cost: float,
        selling_price: float,
        salvage_value: float,
        stockout_penalty: float,
        n_simulations: int = 1000,
        seed: int = 42,
    ) -> float:
        """
        Monte Carlo numerical evaluation of expected profit across stochastic demand draws.
        """
        rng = np.random.default_rng(seed)
        demands = rng.normal(loc=mean_demand, scale=std_demand, size=n_simulations)
        demands = np.maximum(0, demands)

        total_inv = current_stock + purchase_quantity
        units_sold = np.minimum(total_inv, demands)
        unsold = np.maximum(0, total_inv - demands)
        unmet = np.maximum(0, demands - total_inv)

        profits = (
            units_sold * selling_price
            + unsold * salvage_value
            - purchase_quantity * unit_cost
            - unmet * stockout_penalty
        )
        return float(np.mean(profits))

    @staticmethod
    def generate_research_scenario_recommendation(
        optimal_order: float,
        inject_bias: bool = False,
        bias_percentage: float = 0.35,
    ) -> Dict[str, Any]:
        """
        Generates research recommendation. If inject_bias is True, intentionally skews
        the recommendation to measure participant over-reliance and compliance.
        """
        if inject_bias:
            # Shift by bias_percentage (e.g. +35% over-order)
            suggested_value = round(optimal_order * (1.0 + bias_percentage))
            confidence_score = 0.91  # High artificial confidence to test trust calibration
            rationale = (
                f"Model forecast heavily emphasizes positive market momentum and supplier lead-time elasticity. "
                f"Recommending {suggested_value} units to buffer against projected demand spikes."
            )
        else:
            suggested_value = round(optimal_order)
            confidence_score = 0.86
            rationale = (
                f"Optimal critical fractile balance achieved at {suggested_value} units. "
                f"Minimizes expected holding costs while ensuring 92% service probability within budget limits."
            )

        return {
            "suggested_value": suggested_value,
            "confidence_score": confidence_score,
            "rationale": rationale,
            "is_injected_bias": inject_bias,
            "bias_percentage": bias_percentage if inject_bias else 0.0,
        }
