import pytest
from app.services.inventory_evaluator import InventoryEvaluator

def test_inventory_payoff_exact_demand():
    """
    When realized demand exactly equals inventory, unsold = 0 and unmet = 0.
    """
    payoff = InventoryEvaluator.calculate_payoff(
        purchase_quantity=100.0,
        realized_demand=100.0,
        current_stock=0.0,
        unit_cost=50.0,
        selling_price=100.0,
        salvage_value=20.0,
        stockout_penalty=10.0,
    )
    # Revenue = 100 * 100 = 10000; Cost = 100 * 50 = 5000; Net = 5000
    assert payoff["units_sold"] == 100.0
    assert payoff["unsold_inventory"] == 0.0
    assert payoff["unmet_demand"] == 0.0
    assert payoff["net_profit"] == 5000.0

def test_inventory_payoff_overstock():
    """
    When demand is less than total inventory, excess is salvaged.
    """
    payoff = InventoryEvaluator.calculate_payoff(
        purchase_quantity=100.0,
        realized_demand=60.0,
        current_stock=0.0,
        unit_cost=50.0,
        selling_price=100.0,
        salvage_value=20.0,
        stockout_penalty=10.0,
    )
    # Revenue = 60 * 100 = 6000; Salvage = 40 * 20 = 800; Cost = 100 * 50 = 5000; Net = 1800
    assert payoff["units_sold"] == 60.0
    assert payoff["unsold_inventory"] == 40.0
    assert payoff["net_profit"] == 1800.0

def test_inventory_payoff_stockout():
    """
    When demand exceeds total inventory, unmet demand incurs penalty.
    """
    payoff = InventoryEvaluator.calculate_payoff(
        purchase_quantity=80.0,
        realized_demand=100.0,
        current_stock=0.0,
        unit_cost=50.0,
        selling_price=100.0,
        salvage_value=20.0,
        stockout_penalty=10.0,
    )
    # Revenue = 80 * 100 = 8000; Cost = 80 * 50 = 4000; Penalty = 20 * 10 = 200; Net = 3800
    assert payoff["units_sold"] == 80.0
    assert payoff["unmet_demand"] == 20.0
    assert payoff["net_profit"] == 3800.0

def test_optimal_order_critical_fractile():
    """
    Tests critical fractile computation: Cu / (Cu + Co)
    """
    # Unit Cost = 40, Selling Price = 80, Stockout Penalty = 10, Salvage = 15
    # Cu = (80 - 40) + 10 = 50
    # Co = 40 - 15 = 25
    # SL* = 50 / 75 = 0.6667
    res = InventoryEvaluator.calculate_optimal_order(
        mean_demand=1000.0,
        std_demand=150.0,
        current_stock=200.0,
        unit_cost=40.0,
        selling_price=80.0,
        salvage_value=15.0,
        stockout_penalty=10.0,
        budget_limit=100000.0,
    )
    assert abs(res["critical_fractile"] - 0.6667) < 0.001
    assert res["optimal_order_quantity"] > 0
    assert res["is_budget_constrained"] is False

def test_budget_constraint_enforcement():
    """
    Budget ceiling of $20,000 at $100/unit caps order at 200 units.
    """
    res = InventoryEvaluator.calculate_optimal_order(
        mean_demand=2000.0,
        std_demand=200.0,
        current_stock=0.0,
        unit_cost=100.0,
        selling_price=200.0,
        salvage_value=30.0,
        stockout_penalty=20.0,
        budget_limit=20000.0,
    )
    assert res["optimal_order_quantity"] == 200.0
    assert res["is_budget_constrained"] is True
