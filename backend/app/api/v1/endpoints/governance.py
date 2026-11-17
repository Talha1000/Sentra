import json
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from app.core.database import get_db
from app.api.v1.endpoints.auth import require_current_user
from app.models.user import User
from app.models.audit import AuditLog
from app.models.decision import Decision

router = APIRouter()

@router.get("/audit-logs")
async def list_audit_logs(
    limit: int = 50,
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(AuditLog)
        .where(AuditLog.organization_id == user.organization_id)
        .order_by(desc(AuditLog.created_at))
        .limit(limit)
    )
    res = await db.execute(stmt)
    logs = res.scalars().all()
    return [
        {
            "id": l.id,
            "actor_email": l.actor_email,
            "action": l.action,
            "entity_type": l.entity_type,
            "entity_id": l.entity_id,
            "payload": json.loads(l.payload_json),
            "ip_address": l.ip_address,
            "created_at": str(l.created_at),
        }
        for l in logs
    ]

@router.get("/models")
async def get_model_registry(user: User = Depends(require_current_user)):
    return [
        {
            "model_id": "sentra-eval-gpt4o",
            "provider": "OpenAI",
            "version": "gpt-4o-2024-08-06",
            "status": "active",
            "temperature": 0.2,
            "domain_specialization": "Inventory Purchasing & Capital Allocation",
            "prompt_version": "v2.4-structured-uncertainty",
            "average_agreement_rate": 0.814,
            "epistemic_calibration_error": 0.048,
            "last_evaluated": "2026-11-15T09:30:00Z",
        },
        {
            "model_id": "sentra-research-mock",
            "provider": "SENTRA Lab",
            "version": "v1.2-controlled-bias",
            "status": "research_only",
            "temperature": 0.0,
            "domain_specialization": "Over-Reliance Experimental Protocols",
            "prompt_version": "v1.0-deterministic",
            "average_agreement_rate": 0.685,
            "epistemic_calibration_error": 0.124,
            "last_evaluated": "2026-11-17T14:15:00Z",
        },
    ]

@router.get("/usage")
async def get_organization_usage(
    user: User = Depends(require_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Total decisions count
    from app.models.decision import Project
    stmt = select(Decision).join(Project).where(Project.organization_id == user.organization_id)
    res = await db.execute(stmt)
    decisions = res.scalars().all()

    return {
        "organization_id": user.organization_id,
        "plan_tier": "Enterprise Research",
        "decisions_count": len(decisions),
        "decisions_monthly_limit": 5000,
        "active_experiments_count": 3,
        "active_experiments_limit": 50,
        "total_participant_trials": 225,
        "storage_utilized_mb": 42.6,
        "compliance_status": "SOC2_READY_AUDITED",
    }
