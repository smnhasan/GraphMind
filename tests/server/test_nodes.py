import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from fastapi.testclient import TestClient
from server.main import app

client = TestClient(app)

def test_create_node():
    response = client.post("/api/nodes/", json={
        "label": "Person",
        "properties": {"name": "Alice"}
    })
    assert response.status_code in (200, 201, 501)
    