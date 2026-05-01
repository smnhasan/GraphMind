from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from core.events import active_connections, broadcast_event

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            if data.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
    except WebSocketDisconnect:
        active_connections.remove(websocket) if websocket in active_connections else None
    except Exception:
        active_connections.remove(websocket) if websocket in active_connections else None
        