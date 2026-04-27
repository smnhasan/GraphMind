from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models.node import NodeCreate, Node
from core.database import get_db

router = APIRouter()

@router.post("/", response_model=Node)
def create_node(node: NodeCreate, db: Session = Depends(get_db)):
    # Placeholder – full implementation in Phase 2 (graph/store.py)
    return Node(
        id=node.id,
        label=node.label,
        properties=node.properties,
        created_at="2025-04-27T00:00:00",
        updated_at="2025-04-27T00:00:00"
    )

@router.get("/", response_model=List[Node])
def get_nodes(db: Session = Depends(get_db)):
    return []  # placeholder

@router.get("/{node_id}", response_model=Node)
def get_node(node_id: str, db: Session = Depends(get_db)):
    raise HTTPException(status_code=501, detail="Not implemented yet")
    