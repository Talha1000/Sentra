from sqlalchemy import Column, String, Text, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Project(BaseModel):
    __tablename__ = "projects"

    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    domain = Column(String(100), default="inventory", nullable=False)  # inventory, capital, recruitment, operations
    status = Column(String(50), default="active", nullable=False)
    created_by = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    organization = relationship("Organization", back_populates="projects")
    decisions = relationship("Decision", back_populates="project", cascade="all, delete-orphan")

class Decision(BaseModel):
    __tablename__ = "decisions"

    project_id = Column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    created_by = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), nullable=False)
    problem_statement = Column(Text, nullable=False)
    domain = Column(String(100), default="inventory", nullable=False)
    constraints_json = Column(Text, default="{}", nullable=False)
    parameters_json = Column(Text, default="{}", nullable=False)
    
    # Human decision selection
    selected_alternative = Column(String(255), nullable=True)
    human_action_value = Column(Float, nullable=True)
    human_rationale = Column(Text, nullable=True)
    status = Column(String(50), default="draft", nullable=False)  # draft, under_review, committed, audited
    
    project = relationship("Project", back_populates="decisions")
    creator = relationship("User", back_populates="decisions")
    recommendations = relationship("AIRecommendation", back_populates="decision", cascade="all, delete-orphan")

class AIRecommendation(BaseModel):
    __tablename__ = "ai_recommendations"

    decision_id = Column(String(36), ForeignKey("decisions.id", ondelete="CASCADE"), nullable=False, index=True)
    model_provider = Column(String(100), default="openai", nullable=False)
    model_version = Column(String(100), default="gpt-4o", nullable=False)
    prompt_snapshot = Column(Text, nullable=True)
    
    # Recommendation structure
    suggested_value = Column(Float, nullable=False)
    confidence_score = Column(Float, nullable=False)  # 0.0 to 1.0
    rationale = Column(Text, nullable=False)
    uncertainty_json = Column(Text, default="{}", nullable=False)
    evidence_json = Column(Text, default="[]", nullable=False)
    assumptions_json = Column(Text, default="[]", nullable=False)
    limitations_json = Column(Text, default="[]", nullable=False)
    
    # Deliberate deviation for research
    is_deliberately_suboptimal = Column(Boolean, default=False, nullable=False)
    deviation_percentage = Column(Float, default=0.0, nullable=False)

    decision = relationship("Decision", back_populates="recommendations")
