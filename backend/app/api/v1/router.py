from fastapi import APIRouter
from app.api.v1.endpoints import auth, decisions, experiments, analytics, governance

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication & Identity"])
api_router.include_router(decisions.router, prefix="/decisions", tags=["Decision Intelligence Studio"])
api_router.include_router(experiments.router, prefix="/experiments", tags=["Research Laboratory"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Evidence & Analytics"])
api_router.include_router(governance.router, prefix="/governance", tags=["Governance & Reliability"])
