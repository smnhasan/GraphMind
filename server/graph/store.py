from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Dict, Any
from models.node import Node       
from models.edge import Edge        
from core.events import NodeAdded, EdgeAdded  

class GraphStore:
    @staticmethod
    def upsert_node(db: Session, node_id: str, label: str, properties: Dict[str, Any]):
        query = text("""
            INSERT INTO nodes (id, label, properties, updated_at)
            VALUES (:id, :label, :properties, NOW())
            ON CONFLICT (id) DO UPDATE 
            SET label = EXCLUDED.label,
                properties = EXCLUDED.properties,
                updated_at = NOW()
            RETURNING id, label, properties, created_at, updated_at
        """)
        result = db.execute(query, {
            "id": node_id,
            "label": label,
            "properties": properties
        })
        db.commit()
        row = result.fetchone()
        
        event = NodeAdded(
            node_id=row.id,
            label=row.label,
            properties=dict(row.properties)
        )
        return event

    @staticmethod
    def upsert_edge(db: Session, source_id: str, target_id: str, label: str, properties: Dict[str, Any]):
        query = text("""
            INSERT INTO edges (source_id, target_id, label, properties, updated_at)
            VALUES (:source_id, :target_id, :label, :properties, NOW())
            ON CONFLICT DO NOTHING
            RETURNING id, source_id, target_id, label, properties, created_at, updated_at
        """)
        result = db.execute(query, {
            "source_id": source_id,
            "target_id": target_id,
            "label": label,
            "properties": properties
        })
        db.commit()
        
        row = result.fetchone()
        if row:
            event = EdgeAdded(
                edge_id=row.id,
                source_id=row.source_id,
                target_id=row.target_id,
                label=row.label,
                properties=dict(row.properties)
            )
            return event
        return None
