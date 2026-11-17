import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_health_endpoint(client: AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

@pytest.mark.asyncio
async def test_register_and_create_experiment(client: AsyncClient):
    # Register user & organization
    reg_payload = {
        "email": "researcher@university.edu",
        "full_name": "Dr. Sarah Chen",
        "organization_name": "Cognitive Systems Institute",
        "password": "Password123!",
        "role": "researcher",
    }
    reg_res = await client.post("/api/v1/auth/register", json=reg_payload)
    assert reg_res.status_code == 200
    reg_data = reg_res.json()
    token = reg_data["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Verify /auth/me
    me_res = await client.get("/api/v1/auth/me", headers=headers)
    assert me_res.status_code == 200
    assert me_res.json()["email"] == "researcher@university.edu"

    # Create experiment
    exp_payload = {
        "title": "Inventory Over-Reliance Protocol",
        "hypothesis": "AI explanations alter over-reliance rates.",
        "protocol_type": "between_subjects",
    }
    exp_res = await client.post("/api/v1/experiments", json=exp_payload, headers=headers)
    assert exp_res.status_code == 200
    exp_data = exp_res.json()
    assert exp_data["title"] == "Inventory Over-Reliance Protocol"

@pytest.mark.asyncio
async def test_demo_seed_and_analytics_flow(client: AsyncClient):
    # Seed demo environment
    seed_res = await client.post("/api/v1/auth/demo-seed")
    assert seed_res.status_code == 200
    seed_data = seed_res.json()
    token = seed_data["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # List experiments
    exp_res = await client.get("/api/v1/experiments", headers=headers)
    assert exp_res.status_code == 200
    experiments = exp_res.json()
    assert len(experiments) >= 1
    exp_id = experiments[0]["id"]

    # Get analytics summary
    analytics_res = await client.get(f"/api/v1/analytics/experiments/{exp_id}/summary", headers=headers)
    assert analytics_res.status_code == 200
    analytics_data = analytics_res.json()
    assert len(analytics_data["conditions_summary"]) == 3
    assert len(analytics_data["comparisons"]) >= 1
    assert "calibration" in analytics_data

    # Test CSV export
    export_res = await client.get(f"/api/v1/analytics/experiments/{exp_id}/export", headers=headers)
    assert export_res.status_code == 200
    assert "text/csv" in export_res.headers["content-type"]
    assert "participant_order_quantity" in export_res.text
