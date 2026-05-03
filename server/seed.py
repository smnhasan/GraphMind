from sqlalchemy.orm import Session
from sqlalchemy import text
from core.database import SessionLocal
from graph.store import GraphStore

def seed_data():
    db: Session = SessionLocal()

    # Safe truncate with IF EXISTS
    db.execute(text("""
        TRUNCATE TABLE edges, nodes RESTART IDENTITY CASCADE
    """))
    db.commit()

    # Sample Nodes
    nodes = [
        {"id": "n1", "label": "Person", "properties": {"name": "Alice", "age": 30}},
        {"id": "n2", "label": "Person", "properties": {"name": "Bob", "age": 28}},
        {"id": "n3", "label": "Company", "properties": {"name": "xAI"}},
        {"id": "n4", "label": "Project", "properties": {"name": "GraphMind"}},
    ]

    for node in nodes:
        GraphStore.upsert_node(db, node["id"], node["label"], node["properties"])

    # Sample Edges
    edges = [
        {"source_id": "n1", "target_id": "n2", "label": "KNOWS", "properties": {"since": 2024}},
        {"source_id": "n1", "target_id": "n3", "label": "WORKS_AT", "properties": {"role": "Engineer"}},
        {"source_id": "n2", "target_id": "n3", "label": "WORKS_AT", "properties": {"role": "Researcher"}},
        {"source_id": "n3", "target_id": "n4", "label": "FUNDS", "properties": {"amount": 500000}},
    ]

    for edge in edges:
        GraphStore.upsert_edge(db, edge["source_id"], edge["target_id"], edge["label"], edge["properties"])

    # Verify ingestion
    node_count = db.execute(text("SELECT COUNT(*) FROM nodes")).scalar()
    edge_count = db.execute(text("SELECT COUNT(*) FROM edges")).scalar()
    
    print(f"✅ Sample data seeded successfully! Verified {node_count} nodes and {edge_count} edges in database.")

if __name__ == "__main__":
    seed_data()
    