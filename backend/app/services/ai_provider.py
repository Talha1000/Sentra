import json
from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
import httpx
from app.core.config import settings

class AIProviderBase(ABC):
    """
    Abstract provider interface for AI recommendation services.
    Decouples business logic from specific LLM APIs.
    """

    @abstractmethod
    async def generate_recommendation(
        self,
        problem_statement: str,
        domain: str,
        parameters: Dict[str, Any],
        constraints: Dict[str, Any],
    ) -> Dict[str, Any]:
        pass

class MockAIProvider(AIProviderBase):
    """
    Controlled research and testing provider. Produces deterministic,
    fully-structured recommendations with explicit uncertainty bounds.
    """

    async def generate_recommendation(
        self,
        problem_statement: str,
        domain: str,
        parameters: Dict[str, Any],
        constraints: Dict[str, Any],
    ) -> Dict[str, Any]:
        mean_demand = float(parameters.get("mean_demand", 1200))
        unit_cost = float(parameters.get("unit_cost", 45))
        selling_price = float(parameters.get("selling_price", 95))
        current_stock = float(parameters.get("current_stock", 300))
        budget_limit = float(constraints.get("budget_limit", 50000))

        # Calculate a realistic recommendation
        margin = (selling_price - unit_cost) / selling_price
        target = mean_demand * 1.05
        order_qty = max(0.0, round(target - current_stock))
        
        # Apply budget cap
        max_by_budget = budget_limit // unit_cost
        order_qty = min(order_qty, max_by_budget)

        return {
            "model_provider": "sentra-mock-research",
            "model_version": "v1.2-deterministic",
            "suggested_value": order_qty,
            "confidence_score": 0.88,
            "rationale": (
                f"Based on historical sales seasonality and current inventory of {current_stock} units, "
                f"an order of {order_qty} units balances demand coverage at a {round(margin*100, 1)}% gross margin "
                f"without exceeding the ${budget_limit:,.0f} working capital ceiling."
            ),
            "uncertainty": {
                "model_uncertainty": "Low (±4% epistemic error based on 36-month validation)",
                "data_uncertainty": "Moderate (supplier lead time variance σ = 3.2 days)",
                "business_uncertainty": "Economic demand volatility index: 0.18",
                "confidence_interval_95": [round(order_qty * 0.91), round(order_qty * 1.08)],
            },
            "evidence": [
                {"source": "Historical Sales Ledger", "metric": "3-month rolling mean", "value": f"{mean_demand} units/mo"},
                {"source": "Supplier Catalog", "metric": "Unit acquisition cost", "value": f"${unit_cost:.2f}"},
                {"source": "Warehouse Audit", "metric": "On-hand serviceable stock", "value": f"{current_stock} units"},
            ],
            "assumptions": [
                "Supplier lead time does not exceed 14 business days.",
                "Holding cost remains constant at 1.5% of inventory value per month.",
                "Unmet demand results in lost sales rather than backorders.",
            ],
            "limitations": [
                "Does not account for competitor promotions or sudden macroeconomic shifts.",
                "Supplier price tier breaks require minimum 2,000 units.",
            ],
        }

class OpenAIProvider(AIProviderBase):
    """
    OpenAI implementation utilizing structured JSON output mode.
    """

    async def generate_recommendation(
        self,
        problem_statement: str,
        domain: str,
        parameters: Dict[str, Any],
        constraints: Dict[str, Any],
    ) -> Dict[str, Any]:
        if not settings.OPENAI_API_KEY:
            # Gracefully fallback to mock provider if API key not supplied
            mock = MockAIProvider()
            return await mock.generate_recommendation(problem_statement, domain, parameters, constraints)

        system_prompt = (
            "You are SENTRA Decision Intelligence Agent. Provide rigorous, evidence-based recommendations. "
            "You MUST output JSON with: suggested_value (float), confidence_score (float 0-1), rationale (str), "
            "uncertainty (object), evidence (list of objects), assumptions (list of str), limitations (list of str)."
        )
        user_prompt = f"""
Domain: {domain}
Problem: {problem_statement}
Parameters: {json.dumps(parameters)}
Constraints: {json.dumps(constraints)}
"""

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": "gpt-4o",
                        "response_format": {"type": "json_object"},
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": user_prompt},
                        ],
                        "temperature": 0.2,
                    },
                )
                data = response.json()
                content = json.loads(data["choices"][0]["message"]["content"])
                content["model_provider"] = "openai"
                content["model_version"] = "gpt-4o"
                return content
        except Exception:
            mock = MockAIProvider()
            return await mock.generate_recommendation(problem_statement, domain, parameters, constraints)

def get_ai_provider() -> AIProviderBase:
    if settings.AI_PROVIDER_DEFAULT == "openai" and settings.OPENAI_API_KEY:
        return OpenAIProvider()
    return MockAIProvider()
