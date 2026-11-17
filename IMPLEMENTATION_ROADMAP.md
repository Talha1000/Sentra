# SENTRA — Implementation Roadmap

This roadmap governs the end-to-end execution of the SENTRA Decision Intelligence Platform.

---

## Phase Breakdown

### Phase 1: Foundations & Architecture (Current)
- Scaffolding of Backend (FastAPI, Python 3.12, Pydantic v2, SQLAlchemy 2.0 async, SQLite/PostgreSQL)
- Scaffolding of Frontend (Next.js 15, TypeScript, Tailwind CSS, Lucide icons, Framer Motion)
- Architecture documentation, Database schemas, API specifications, and Design System tokens
- Initial Git discipline, `.gitignore`, Docker Compose infrastructure

### Phase 2: Design System & Core UI Components (SEDS)
- Implementation of SENTRA Editorial & Analytic Design System primitives:
  - Surface containers (`Card`, `Panel`, `Substrate`)
  - Typography (`Heading`, `Text`, `MonospaceNumber`, `Badge`)
  - Forms (`Input`, `Select`, `Slider`, `Toggle`, `Button`, `ButtonGroup`)
  - Layout & Navigation (`AppShell`, `Sidebar`, `Topbar`, `Breadcrumbs`, `CommandPalette`)
  - Data Visualization & Feedback (`MetricCard`, `CalibrationPlot`, `LatencyBoxplot`, `Modal`, `Toast`, `EmptyState`, `Skeleton`)

### Phase 3: Public Experience & Identity
- High-conviction editorial Landing Page with live interactive decision teaser
- Product overview pages, Methodology explanations, Research integrity declarations
- Authentication screens (Login, Register, Password Recovery, Onboarding)

### Phase 4: Core Domain Engines (Backend)
- Domain Services:
  - `DecisionEngine`: Problem definitions, constraint evaluation, multi-attribute utility, risk distribution
  - `InventoryDomain`: Economic order quantity (EOQ), newsvendor stochastic profit modeling, holding & stockout penalties
  - `AIService`: Provider abstraction, structured JSON generation, uncertainty decomposition, calibrated probability handling
  - `ExperimentOrchestrator`: Experiment creation, randomized Latin-square condition assignment, scenario management, participant session tracking, server-side clock response timing
  - `StatisticalEngine`: SciPy / Statsmodels integration: Welch's t-test, Mann-Whitney U, Cohen's d, regression, trust calibration
  - `GovernanceEngine`: Immutable audit logger, tenant isolation enforcement, role-based access control (RBAC)

### Phase 5: Modules Implementation (Frontend & Full-Stack Integration)
- **Module A: Intelligence Workspace**: Executive metrics, active project portfolio, decisions ledger, activity stream
- **Module B: Decision Intelligence Studio**: Problem setup, constraint sliders, what-if sensitivity simulator, trade-off matrix
- **Module C: Human–AI Collaboration**: Recommendation inspection, uncertainty decomposition, rationale drawer, override and approval workflows
- **Module D: Research Laboratory**: Experiment designer, participant recruitment/consent view, double-blind execution runner, high-resolution reaction timing
- **Module E: Evidence & Analytics**: Empirical comparison across conditions A, B, and C, trust calibration curves, statistical significance outputs, CSV raw microdata export
- **Module F: Governance & Reliability**: Audit trail log, model card & prompt version ledger, organization tenant settings

### Phase 6: Testing, Quality Assurance & Verification
- Backend unit tests (`pytest`): Inventory math, statistical calculations, auth, API endpoints
- Frontend unit & integration tests: Components, experiment state machine, timing accuracy
- WCAG 2.2 AA accessibility audit, responsive testing across desktop and tablet
- Docker Compose end-to-end containerized verification

### Phase 7: Deployment & Operations Handover
- Production container builds, security hardening, database migration runbooks
- Final documentation and release tagging
