from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from query_engine.executor import QueryExecutor   # ← Fixed import

router = APIRouter()

@router.post("/query")
async def run_query(query: str, db: Session = Depends(get_db)):
    executor = QueryExecutor(db)
    results = executor.execute(query)
    return {"results": results}
    