from sqlalchemy.orm import Session
from sqlalchemy import text

class GraphTraversal:
    @staticmethod
    def get_neighbors(db: Session, node_id: str):
        query = text("""
            SELECT * FROM edges WHERE source_id = :node_id OR target_id = :node_id
        """)
        return db.execute(query, {"node_id": node_id}).fetchall()
        