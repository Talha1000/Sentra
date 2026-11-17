from sqlalchemy import Column, String, Text, Float, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Experiment(BaseModel):
    __tablename__ = "experiments"

    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    created_by = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), nullable=False)
    hypothesis = Column(Text, nullable=False)
    protocol_type = Column(String(100), default="between_subjects", nullable=False)  # between_subjects, within_subjects
    status = Column(String(50), default="active", nullable=False)  # draft, active, paused, completed
    randomization_seed = Column(Integer, default=42, nullable=False)

    organization = relationship("Organization", back_populates="experiments")
    conditions = relationship("ExperimentCondition", back_populates="experiment", cascade="all, delete-orphan")
    scenarios = relationship("Scenario", back_populates="experiment", cascade="all, delete-orphan")
    sessions = relationship("ParticipantSession", back_populates="experiment", cascade="all, delete-orphan")

class ExperimentCondition(BaseModel):
    __tablename__ = "experiment_conditions"

    experiment_id = Column(String(36), ForeignKey("experiments.id", ondelete="CASCADE"), nullable=False, index=True)
    code = Column(String(50), nullable=False)  # CONDITION_A, CONDITION_B, CONDITION_C
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    ai_assistance_mode = Column(String(100), nullable=False)  # none, recommendation_only, recommendation_with_explanation

    experiment = relationship("Experiment", back_populates="conditions")
    sessions = relationship("ParticipantSession", back_populates="condition")

class Scenario(BaseModel):
    __tablename__ = "scenarios"

    experiment_id = Column(String(36), ForeignKey("experiments.id", ondelete="CASCADE"), nullable=False, index=True)
    order_index = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    domain = Column(String(100), default="inventory", nullable=False)
    parameters_json = Column(Text, nullable=False)  # historical sales, current stock, cost, price, demand forecast
    
    # Ground truth values (deterministic mathematics, never LLM hallucination)
    ground_truth_optimal_value = Column(Float, nullable=False)
    ground_truth_max_payoff = Column(Float, nullable=False)
    
    # AI presentation parameters
    ai_suggested_value = Column(Float, nullable=False)
    ai_confidence_score = Column(Float, default=0.85, nullable=False)
    ai_explanation = Column(Text, nullable=True)
    is_injected_bias = Column(Boolean, default=False, nullable=False)
    bias_percentage = Column(Float, default=0.0, nullable=False)

    experiment = relationship("Experiment", back_populates="scenarios")
    events = relationship("DecisionEvent", back_populates="scenario")

class ParticipantSession(BaseModel):
    __tablename__ = "participant_sessions"

    experiment_id = Column(String(36), ForeignKey("experiments.id", ondelete="CASCADE"), nullable=False, index=True)
    condition_id = Column(String(36), ForeignKey("experiment_conditions.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    pseudonym_token = Column(String(100), unique=True, index=True, nullable=False)
    consent_confirmed = Column(Boolean, default=False, nullable=False)
    status = Column(String(50), default="in_progress", nullable=False)  # in_progress, completed, abandoned
    
    experiment = relationship("Experiment", back_populates="sessions")
    condition = relationship("ExperimentCondition", back_populates="sessions")
    user = relationship("User", back_populates="participant_sessions")
    events = relationship("DecisionEvent", back_populates="session", cascade="all, delete-orphan")

class DecisionEvent(BaseModel):
    __tablename__ = "decision_events"

    session_id = Column(String(36), ForeignKey("participant_sessions.id", ondelete="CASCADE"), nullable=False, index=True)
    scenario_id = Column(String(36), ForeignKey("scenarios.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Decision action & timing
    user_action_value = Column(Float, nullable=False)
    reaction_time_ms = Column(Float, nullable=False)  # Microsecond accurate from performance.now()
    server_time_ms = Column(Float, nullable=False)
    subjective_confidence = Column(Float, default=0.5, nullable=False)  # 0.0 to 1.0 reported by human
    
    # Ground-truth evaluation metrics
    ground_truth_deviation = Column(Float, nullable=False)  # abs(action - optimal)
    payoff_achieved = Column(Float, nullable=False)
    economic_loss = Column(Float, nullable=False)  # max_payoff - payoff_achieved
    
    # Research collaboration indices
    agreed_with_ai = Column(Boolean, nullable=False)
    over_reliance_flag = Column(Boolean, default=False, nullable=False)  # Agreed with AI when AI had injected bias

    session = relationship("ParticipantSession", back_populates="events")
    scenario = relationship("Scenario", back_populates="events")
