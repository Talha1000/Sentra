from typing import Dict, Any, List, Optional
from pydantic import BaseModel, ConfigDict

class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    domain: str = "inventory"

class ProjectResponse(BaseModel):
    id: str
    organization_id: str
    title: str
    description: Optional[str]
    domain: str
    status: str

    model_config = ConfigDict(from_attributes=True)

class DecisionCreate(BaseModel):
    project_id: str
    title: str
    problem_statement: str
    domain: str = "inventory"
    parameters: Dict[str, Any]
    constraints: Dict[str, Any]

class DecisionCommit(BaseModel):
    selected_alternative: str
    human_action_value: float
    human_rationale: str

class SimulationRequest(BaseModel):
    purchase_quantity: float
    mean_demand: float
    std_demand: float
    current_stock: float
    unit_cost: float
    selling_price: float
    salvage_value: float
    stockout_penalty: float
    n_simulations: int = 1000

class QuickSimRequest(BaseModel):
    purchase_quantity: float = 1420.0
    mean_demand: float = 1400.0
    std_demand: float = 220.0
    current_stock: float = 0.0
    unit_cost: float = 45.0
    selling_price: float = 85.0
    salvage_value: float = 25.0
    stockout_penalty: float = 20.0
    budget_limit: float = 250000.0
    n_simulations: int = 1000

class DecisionResponse(BaseModel):
    id: str
    project_id: str
    title: str
    problem_statement: str
    domain: str
    status: str
    human_action_value: Optional[float] = None
    human_rationale: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
