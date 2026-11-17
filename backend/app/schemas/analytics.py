from typing import Dict, Any, List, Optional
from pydantic import BaseModel

class ConditionMetrics(BaseModel):
    condition_code: str
    condition_name: str
    n_participants: int
    mean_accuracy: float
    mean_payoff: float
    mean_latency_ms: float
    agreement_rate: float
    over_reliance_rate: float

class StatisticalTestResult(BaseModel):
    metric: str
    label_a: str
    label_b: str
    mean_a: float
    mean_b: float
    welch_t: Dict[str, Any]
    mann_whitney_u: Dict[str, Any]
    cohens_d: float
    effect_interpretation: str

class CalibrationCurveResponse(BaseModel):
    bins: List[Dict[str, Any]]
    expected_calibration_error: float
    perfect_calibration_reference: List[Dict[str, float]]

class ExperimentAnalyticsResponse(BaseModel):
    experiment_id: str
    total_participants: int
    total_decision_events: int
    conditions_summary: List[ConditionMetrics]
    comparisons: List[Dict[str, Any]]
    calibration: CalibrationCurveResponse
