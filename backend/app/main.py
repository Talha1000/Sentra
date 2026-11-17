from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.router import api_router
import app.models  # Ensure all ORM models are registered

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables on startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Cleanup database connection pool on shutdown
    await engine.dispose()

app = FastAPI(
    title="SENTRA Decision Intelligence API",
    description=(
        "Enterprise-grade decision intelligence platform and research laboratory API. "
        "Supports human-AI collaborative decisions, deterministic ground-truth scoring, "
        "balanced randomized experimental protocols, and real-time empirical statistical inference."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health endpoint
@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "service": "SENTRA Decision Intelligence Platform",
        "version": "1.0.0",
        "environment": "production-ready",
    }

# Mount v1 routes
app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
