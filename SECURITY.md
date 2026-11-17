# SENTRA — Security & Compliance Architecture

## 1. Tenant Isolation
Every database query is automatically scoped to the authenticated user's `organization_id`. Cross-tenant queries are blocked at both the ORM query construction level and the route dependency injection level.

## 2. Authentication & Session Security
- Passwords are encrypted with salted `bcrypt` hashes.
- JWT tokens are signed using high-entropy HMAC-SHA256 with short-lived expiration (60 minutes) and persistent refresh token revocation capability.
- Anonymous experimental participants receive randomized opaque pseudonymous tokens (`uuid4`) containing zero Personally Identifiable Information (PII).

## 3. Data Protection & Privacy
- Zero credential logging: passwords, bearer tokens, API keys, and raw participant personal data are strictly redacted from structured application logs.
- Client inputs are validated against strict Pydantic schemas to prevent injection attacks and prototype pollution.
- Safe file upload handling: CSV and dataset uploads are validated for MIME type, sanitized, and parsed strictly through memory-capped tabular readers with no arbitrary file execution.

## 4. Audit & Immutability
All high-consequence business decisions, parameter overrides, and experiment protocol adjustments write immutable records into the `audit_logs` table with actor ID, timestamp, entity type, and serialized before/after deltas.
