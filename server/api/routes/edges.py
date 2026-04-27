from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models.edge import EdgeCreate, Edge
from core.database import get_db

router = APIRouter()

@router.post("/", response_model=Edge)
def create_edge(edge: EdgeCreate, db: Session = Depends(get_db)):
    return Edge(
        id=1,
        source_id=edge.source_id,
        target_id=edge.target_id,
        label=edge.label,
        properties=edge.properties,
        created_at="2025-04-27T00:00:00",
        updated_at="2025-04-27T00:00:00"
    )

@router.get("/", response_model=List[Edge])
def get_edges(db: Session = Depends(get_db)):
    return []  # placeholder
    