# SENTRA — Testing & Verification Strategy

## 1. Testing Pyramid
1. **Unit Tests (Mathematical & Statistical Core)**:
   - Inventory payoff modeling (stochastic demand, newsvendor profit curve, stockout penalties, holding costs).
   - Statistical estimators (Welch's t-test, Mann-Whitney U, Cohen's d effect sizes, calibration binning).
   - Randomization algorithms (balanced condition assignment across participants).
2. **Integration Tests (API & Database)**:
   - Tenant isolation & unauthorized cross-tenant rejection.
   - Experiment lifecycle (creation -> participant join -> trial event submission -> evaluation -> session close).
   - Decision creation, simulation, and audit logging.
3. **Frontend Component & State Tests**:
   - High-precision reaction time event tracking (`performance.now()` capture).
   - Form constraint validation and accessible keyboard navigation.
4. **End-to-End User Flow Tests**:
   - Participant takes 3-scenario experiment, completes decisions, and verifies results in researcher analytics.

## 2. Test Execution Commands
- Backend:
  ```bash
  cd backend
  pytest -v --tb=short
  ```
- Frontend:
  ```bash
  cd frontend
  npm run test
  ```
