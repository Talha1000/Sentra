# SENTRA — Deployment & Operations Guide

## 1. Local Development via Docker Compose
SENTRA provides a unified multi-container setup with:
- `db`: PostgreSQL 16
- `backend`: FastAPI with async engine & automatic schema creation
- `frontend`: Next.js 15 App Router

To launch:
```bash
docker compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000/api/v1`
- Interactive API Docs: `http://localhost:8000/docs`

## 2. Environment Variables (`.env.example`)
```env
# Database
DATABASE_URL=postgresql+asyncpg://sentra:sentra_password@localhost:5432/sentra_db
# Or for local development without Postgres:
# DATABASE_URL=sqlite+aiosqlite:///./sentra_dev.db

# Security & Secrets
SECRET_KEY=change-this-in-production-to-a-secure-random-32-byte-hex-string
ACCESS_TOKEN_EXPIRE_MINUTES=60

# AI Provider Gateway
OPENAI_API_KEY=mock-key-or-real-api-key
AI_PROVIDER_DEFAULT=mock  # mock, openai, anthropic

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```
