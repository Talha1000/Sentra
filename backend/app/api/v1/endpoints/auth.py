import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import jwt

from app.core.config import settings
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.organization import Organization
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserResponse, TokenResponse
from app.services.experiment_service import ExperimentService

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/token", auto_error=False)

async def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> Optional[User]:
    if not token:
        return None
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if not user_id:
            return None
    except jwt.PyJWTError:
        return None

    stmt = select(User).where(User.id == user_id)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()
    return user

async def require_current_user(
    current_user: Optional[User] = Depends(get_current_user),
) -> User:
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials were not provided or have expired.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return current_user

@router.post("/register", response_model=TokenResponse)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check if user already exists
    stmt = select(User).where(User.email == user_in.email)
    res = await db.execute(stmt)
    if res.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="A user with this email address already exists.")

    # Create Organization
    slug = user_in.organization_name.lower().replace(" ", "-")
    org = Organization(name=user_in.organization_name, slug=slug)
    db.add(org)
    await db.flush()

    # Create Admin User
    user = User(
        organization_id=org.id,
        email=user_in.email,
        full_name=user_in.full_name,
        hashed_password=get_password_hash(user_in.password),
        role=user_in.role or "admin",
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    token = create_access_token(user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user,
    }

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin, db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.email == credentials.email)
    res = await db.execute(stmt)
    user = res.scalar_one_or_none()

    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    token = create_access_token(user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user,
    }

@router.post("/token", response_model=TokenResponse)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(User).where(User.email == form_data.username)
    res = await db.execute(stmt)
    user = res.scalar_one_or_none()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password.")

    token = create_access_token(user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user,
    }

@router.get("/me", response_model=UserResponse)
async def get_me(user: User = Depends(require_current_user)):
    return user

@router.post("/demo-seed", response_model=TokenResponse)
async def seed_demo_environment(db: AsyncSession = Depends(get_db)):
    """
    Convenience endpoint for zero-friction evaluation. Seeds a complete executive workspace,
    default research experiment, and synthetic participants across Conditions A, B, and C.
    """
    demo_email = "director@sentra.ai"
    stmt = select(User).where(User.email == demo_email)
    res = await db.execute(stmt)
    existing_user = res.scalar_one_or_none()

    if existing_user:
        token = create_access_token(existing_user.id)
        return {"access_token": token, "token_type": "bearer", "user": existing_user}

    # Create Demo Organization
    org = Organization(name="SENTRA Research & Risk Intelligence", slug="sentra-research")
    db.add(org)
    await db.flush()

    # Create Executive User
    user = User(
        organization_id=org.id,
        email=demo_email,
        full_name="Elena Vance, Chief Decision Officer",
        hashed_password=get_password_hash("Sentra123!"),
        role="admin",
    )
    db.add(user)
    await db.flush()

    # Create Default Inventory Experiment with scenarios
    exp = await ExperimentService.create_default_inventory_experiment(db, org.id, user.id)

    # Seed synthetic participants for each condition
    from app.models.experiment import ExperimentCondition, Scenario, ParticipantSession, DecisionEvent
    import numpy as np

    c_stmt = select(ExperimentCondition).where(ExperimentCondition.experiment_id == exp.id)
    c_res = await db.execute(c_stmt)
    conditions = c_res.scalars().all()

    s_stmt = select(Scenario).where(Scenario.experiment_id == exp.id).order_by(Scenario.order_index)
    s_res = await db.execute(s_stmt)
    scenarios = s_res.scalars().all()

    # Generate 15 participants per condition (45 total) with realistic empirical distributions
    rng = np.random.default_rng(42)
    for cond in conditions:
        for p_idx in range(15):
            p_session = ParticipantSession(
                experiment_id=exp.id,
                condition_id=cond.id,
                pseudonym_token=f"synth-{cond.code.lower()}-{p_idx+1:02d}",
                consent_confirmed=True,
                status="completed",
            )
            db.add(p_session)
            await db.flush()

            for sc in scenarios:
                opt = sc.ground_truth_optimal_value
                ai_val = sc.ai_suggested_value
                is_bias = sc.is_injected_bias

                if cond.code == "CONDITION_A":
                    # Human only: moderate variance around optimal, longer latency (~8.5s)
                    action = float(round(rng.normal(loc=opt * 1.02, scale=opt * 0.12)))
                    latency = float(round(rng.normal(loc=8400, scale=1200), 1))
                    confidence = float(round(rng.uniform(0.55, 0.75), 2))
                elif cond.code == "CONDITION_B":
                    # AI only: high reliance on AI recommendation, faster latency (~4.2s)
                    # When AI is biased, participants follow AI 65% of the time (over-reliance!)
                    if is_bias and rng.random() < 0.65:
                        action = float(round(ai_val * rng.uniform(0.98, 1.02)))
                    else:
                        action = float(round(opt * rng.uniform(0.95, 1.05)))
                    latency = float(round(rng.normal(loc=4200, scale=800), 1))
                    confidence = float(round(rng.uniform(0.70, 0.88), 2))
                else:
                    # CONDITION_C: AI with explanation: highest accuracy when AI is right,
                    # but moderate over-reliance when AI is subtly biased (~45%), latency ~6.8s
                    if is_bias and rng.random() < 0.45:
                        action = float(round(ai_val * rng.uniform(0.98, 1.02)))
                    else:
                        action = float(round(opt * rng.uniform(0.97, 1.03)))
                    latency = float(round(rng.normal(loc=6800, scale=950), 1))
                    confidence = float(round(rng.uniform(0.80, 0.95), 2))

                event = await ExperimentService.record_decision_event(
                    db,
                    session_id=p_session.id,
                    scenario_id=sc.id,
                    user_action_value=max(0.0, action),
                    reaction_time_ms=max(1000.0, latency),
                    subjective_confidence=confidence,
                )

    await db.commit()
    token = create_access_token(user.id)
    return {"access_token": token, "token_type": "bearer", "user": user}
