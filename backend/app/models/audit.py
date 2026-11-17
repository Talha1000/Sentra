from sqlalchemy import Column, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class AuditLog(BaseModel):
    __tablename__ = "audit_logs"

    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    actor_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    actor_email = Column(String(255), nullable=True)
    action = Column(String(100), nullable=False)  # CREATE_DECISION, COMMIT_DECISION, RUN_SIMULATION, JOIN_EXPERIMENT
    entity_type = Column(String(100), nullable=False)  # decision, experiment, user, organization
    entity_id = Column(String(36), nullable=False)
    payload_json = Column(Text, default="{}", nullable=False)
    ip_address = Column(String(100), default="127.0.0.1", nullable=False)

    organization = relationship("Organization", back_populates="audit_logs")
