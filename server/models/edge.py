from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
from datetime import datetime

class EdgeBase(BaseModel):
    source_id: str
    target_id: str
    label: str = Field(..., min_length=1, max_length=100)
    properties: Dict[str, Any] = Field(default_factory=dict)

class EdgeCreate(EdgeBase):
    pass

class Edge(EdgeBase):
    id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        