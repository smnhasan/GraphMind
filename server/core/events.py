from pydantic import BaseModel
from typing import Dict, Any, Literal
from datetime import datetime

class GraphEvent(BaseModel):
    type: Literal["NodeAdded", "EdgeAdded", "NodeUpdated", "EdgeRemoved"]
    timestamp: datetime = datetime.now()

class NodeAdded(GraphEvent):
    type: Literal["NodeAdded"] = "NodeAdded"
    node_id: str
    label: str
    properties: Dict[str, Any]

class EdgeAdded(GraphEvent):
    type: Literal["EdgeAdded"] = "EdgeAdded"
    edge_id: int
    source_id: str
    target_id: str
    label: str
    properties: Dict[str, Any]

class NodeUpdated(GraphEvent):
    type: Literal["NodeUpdated"] = "NodeUpdated"
    node_id: str
    label: str
    properties: Dict[str, Any]

class EdgeRemoved(GraphEvent):
    type: Literal["EdgeRemoved"] = "EdgeRemoved"
    edge_id: int
    source_id: str
    target_id: str

# Event bus (in-memory for now, can be replaced with Redis later)
active_connections = []

async def broadcast_event(event: GraphEvent):
    """Broadcast event to all connected WebSocket clients"""
    for connection in active_connections[:]:
        try:
            await connection.send_json(event.model_dump())
        except:
            active_connections.remove(connection)