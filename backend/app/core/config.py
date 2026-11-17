import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "SENTRA Decision Intelligence"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "sentra-super-secret-production-grade-key-at-least-32-chars")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours for dev sessions
    
    # Database: Defaults to SQLite for local development zero-friction setup, PostgreSQL in production
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./sentra.db")
    
    # AI Provider configuration
    AI_PROVIDER_DEFAULT: str = os.getenv("AI_PROVIDER_DEFAULT", "mock")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
