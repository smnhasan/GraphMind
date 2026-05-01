import sys
import os
from pathlib import Path

# Force project root into PYTHONPATH
root_dir = str(Path(__file__).parent.parent.parent.absolute())
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from fastapi.testclient import TestClient
from server.main import app

client = TestClient(app)

def test_websocket_connection():
    with client.websocket_connect("/api/ws") as websocket:
        assert websocket is not None
        websocket.send_json({"type": "ping"})
        response = websocket.receive_json(timeout=3)
        assert response is not None
        