from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from graph.algorithms import GraphAlgorithms

router = APIRouter()

@router.get("/analytics/centrality")
async def get_centrality(db: Session = Depends(get_db)):
    return GraphAlgorithms.degree_centrality(db)

@router.get("/analytics/pagerank")
async def get_pagerank(db: Session = Depends(get_db)):
    return GraphAlgorithms.pagerank(db)

@router.get("/analytics/shortest_path")
async def get_shortest_path(source: str, target: str, db: Session = Depends(get_db)):
    return GraphAlgorithms.shortest_path(db, source, target)
    