# Changelog

All notable changes to the SENTRA Decision Intelligence Platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-17
### Added
- Complete full-stack decision intelligence platform and research laboratory:
  - **Backend (`backend/`)**:
    - FastAPI 0.115+ asynchronous ASGI architecture under Python 3.12.
    - SQLAlchemy 2.0 async engine with SQLite dev fallback and PostgreSQL production support.
    - Deterministic inventory purchasing evaluator implementing newsvendor stochastic critical fractile optimization and holding/salvage/stockout penalties (`InventoryEvaluator`).
    - Empirical statistical inference engine implementing Welch's t-test, Mann-Whitney U, Cohen's d effect sizes, and trust calibration curves with Expected Calibration Error (`StatisticalEngine`).
    - AI Provider abstraction (`AIProviderBase`, `MockAIProvider`, `OpenAIProvider`) with structured JSON uncertainty decomposition and prompt versioning.
    - Research experiment orchestrator with Latin-square / balanced condition assignment, double-blind protocol enforcement, and deliberate bias injection for over-reliance investigations (`ExperimentService`).
    - Immutable audit event logging and tenant isolation middleware.
    - Full automated pytest test suite (11 passed in 1.99s).
  - **Frontend (`frontend/`)**:
    - Next.js 15 (App Router) + React 19 + TypeScript (strict).
    - SENTRA Editorial & Analytic Design System (SEDS) with custom Tailwind tokens: warm ivory canvas (`#F7F6F2`, `#FFFFFF`), graphite ink typography (`#12151A`, `#484F59`), hairline dividers (`#E5E2D9`), and restrained semantic accents (Cognition Amber, Forest Spruce, Crimson Risk).
    - Public landing page with interactive decision teaser demonstrating cognitive over-reliance.
    - Application shell with collapsible navigation sidebar and topbar.
    - **Module A (Intelligence Workspace)**: Executive KPI cards, recent consequential decisions ledger with domain filters, and audit feed.
    - **Module B (Decision Intelligence Studio)**: Interactive problem formulation, what-if Monte Carlo simulation across 1,000 draws, and structured AI recommendation inspection.
    - **Module D (Research Laboratory)**: Experiment management, hypothesis tracking, and between-subjects condition structure.
    - **Interactive Participant Trial Runner**: Double-blind experimental battery across 5 scenarios, microsecond reaction time logging via `performance.now()`, ground-truth scoring, and over-reliance detection.
    - **Module E (Evidence & Analytics Engine)**: Real-time statistical comparisons, Welch t-test results, SVG Trust Calibration Curve, and raw research microdata CSV export.
    - **Module F (Governance & Reliability)**: Model registry cards, prompt provenance, and tamper-evident audit ledger.
    - Zero build errors (`next build` compiled cleanly for all 9 routes).
  - **Infrastructure**:
    - Docker Compose multi-container stack (`postgres:16`, `backend`, `frontend`).
    - Multi-stage Dockerfiles for backend and frontend.
