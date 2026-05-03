from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from core.events import active_connections, broadcast_event, user_presence   # ← Added user_presence

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, username: str = "Anonymous"):
    await websocket.accept()
    active_connections.append(websocket)
    user_presence[id(websocket)] = username
    await broadcast_event({"type": "user_joined", "username": username})
    try:
        while True:
            data = await websocket.receive_json()
            if data.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
    except WebSocketDisconnect:
        active_connections.remove(websocket) if websocket in active_connections else None
        user_presence.pop(id(websocket), None)
    except Exception:
        active_connections.remove(websocket) if websocket in active_connections else None
        user_presence.pop(id(websocket), None)
        