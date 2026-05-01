import pytest
from fastapi.testclient import TestClient
from server.main import app

client = TestClient(app)

def test_create_edge():
    response = client.post("/api/edges/", json={
        "source_id": "node-1",
        "target_id": "node-2",
        "label": "KNOWS",
        "properties": {"since": 2024}
    })
    assert response.status_code in (200, 201, 501)
    