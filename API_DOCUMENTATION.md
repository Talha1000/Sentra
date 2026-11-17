# SENTRA — REST API Documentation (v1)

Base URL: `/api/v1`

## 1. Authentication & Identity
- `POST /api/v1/auth/register` — Register a new user and organization.
- `POST /api/v1/auth/login` — Authenticate and receive a JWT Bearer token.
- `GET /api/v1/auth/me` — Retrieve the authenticated user's profile and active organization context.
- `POST /api/v1/auth/logout` — Invalidate the active session.

## 2. Organization & Teams
- `GET /api/v1/organizations/current` — Get organization profile and usage limits.
- `PATCH /api/v1/organizations/current` — Update organization settings.
- `GET /api/v1/organizations/members` — List members with roles (Admin, Researcher, Analyst, Participant).
- `POST /api/v1/organizations/members/invite` — Invite new team member.

## 3. Decision Intelligence Studio
- `GET /api/v1/projects` — List active decision projects for tenant.
- `POST /api/v1/projects` — Create a new project.
- `GET /api/v1/decisions` — List decisions with filter by domain, status, or date.
- `POST /api/v1/decisions` — Create a decision case.
- `GET /api/v1/decisions/{id}` — Get full decision details including alternatives and AI recommendations.
- `POST /api/v1/decisions/{id}/simulate` — Run what-if Monte Carlo simulation or constraint sensitivity.
- `POST /api/v1/decisions/{id}/recommend` — Request structured AI recommendation from provider.
- `POST /api/v1/decisions/{id}/commit` — Commit final human decision with rationale.

## 4. Research Laboratory
- `GET /api/v1/experiments` — List research experiments.
- `POST /api/v1/experiments` — Create research experiment protocol with hypothesis and conditions.
- `GET /api/v1/experiments/{id}` — Retrieve experiment details, scenarios, and assignment rules.
- `POST /api/v1/experiments/{id}/scenarios` — Add or configure benchmark scenarios with ground-truth values.
- `POST /api/v1/experiments/{id}/join` — Participant registration, consent, and server-side randomized condition assignment.
- `POST /api/v1/experiments/sessions/{sessionId}/events` — Submit decision event with `reaction_time_ms`, user action, and confidence.
- `POST /api/v1/experiments/sessions/{sessionId}/complete` — Conclude experiment session.

## 5. Evidence & Statistical Analytics
- `GET /api/v1/analytics/experiments/{id}/summary` — Aggregate performance metrics (accuracy, latency, agreement).
- `GET /api/v1/analytics/experiments/{id}/statistical-tests` — Real-time hypothesis tests (Welch's t-test, Mann-Whitney U, Cohen's d).
- `GET /api/v1/analytics/experiments/{id}/calibration` — Trust calibration curve data points (confidence vs accuracy).
- `GET /api/v1/analytics/experiments/{id}/export` — Export raw, anonymized trial microdata in CSV or JSON format.

## 6. Governance & Reliability
- `GET /api/v1/governance/audit-logs` — Tamper-evident ledger of all system decisions, modifications, and access events.
- `GET /api/v1/governance/models` — Active AI model cards, prompt templates, and evaluation logs.
