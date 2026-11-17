from typing import Dict, Any, List, Optional
from pydantic import BaseModel, ConfigDict

class ExperimentCreate(BaseModel):
    title: str
    hypothesis: str
    protocol_type: str = "between_subjects"

class ConditionResponse(BaseModel):
    id: str
    code: str
    name: str
    description: Optional[str]
    ai_assistance_mode: str

    model_config = ConfigDict(from_attributes=True)

class ScenarioResponse(BaseModel):
    id: str
    order_index: int
    title: str
    domain: str
    parameters: Dict[str, Any]
    ground_truth_optimal_value: float
    ai_suggested_value: float
    ai_confidence_score: float
    ai_explanation: Optional[str]
    is_injected_bias: bool

class ParticipantJoinRequest(BaseModel):
    experiment_id: str
    consent_confirmed: bool = True

class ParticipantSessionResponse(BaseModel):
    id: str
    experiment_id: str
    condition_id: str
    condition_code: str
    ai_assistance_mode: str
    pseudonym_token: str
    consent_confirmed: bool
    status: str

class DecisionEventSubmit(BaseModel):
    scenario_id: str
    user_action_value: float
    reaction_time_ms: float
    subjective_confidence: float = 0.5

class DecisionEventResponse(BaseModel):
    id: str
    scenario_id: str
    user_action_value: float
    reaction_time_ms: float
    ground_truth_deviation: float
    payoff_achieved: float
    economic_loss: float
    agreed_with_ai: bool
    over_reliance_flag: bool

    model_config = ConfigDict(from_attributes=True)
