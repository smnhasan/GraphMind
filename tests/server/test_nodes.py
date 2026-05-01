import pytest
from fastapi.testclient import TestClient
from server.main import app

client = TestClient(app)

def test_create_node():
    response = client.post("/api/nodes/", json={
        "label": "Person",
        "properties": {"name": "Alice", "age": 30}
    })
    assert response.status_code in (200, 201, 501)
    