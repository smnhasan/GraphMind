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
    from sqlalchemy import text
    query = text("SELECT id, source_id, target_id, label, properties, created_at, updated_at FROM edges")
    result = db.execute(query)
    edges = []
    for row in result:
        edges.append(Edge(
            id=row.id,
            source_id=row.source_id,
            target_id=row.target_id,
            label=row.label,
            properties=row.properties,
            created_at=row.created_at,
            updated_at=row.updated_at
        ))
    return edges
    