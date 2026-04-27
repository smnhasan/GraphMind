from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
from datetime import datetime
import uuid

class NodeBase(BaseModel):
    label: str = Field(..., min_length=1, max_length=100)
    properties: Dict[str, Any] = Field(default_factory=dict)

class NodeCreate(NodeBase):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()))

class Node(NodeBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        