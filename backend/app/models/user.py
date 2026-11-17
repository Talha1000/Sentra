from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class User(BaseModel):
    __tablename__ = "users"

    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="analyst", nullable=False)  # admin, researcher, analyst, participant
    is_active = Column(Boolean, default=True, nullable=False)

    organization = relationship("Organization", back_populates="users")
    decisions = relationship("Decision", back_populates="creator")
    participant_sessions = relationship("ParticipantSession", back_populates="user")
