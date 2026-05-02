from sqlalchemy.orm import Session
from sqlalchemy import text
import networkx as nx
from typing import Dict, List

class GraphAlgorithms:
    @staticmethod
    def degree_centrality(db: Session):
        query = text("SELECT id, label FROM nodes")
        nodes = db.execute(query).fetchall()
        query = text("SELECT source_id, target_id FROM edges")
        edges = db.execute(query).fetchall()

        G = nx.Graph()
        G.add_nodes_from([row.id for row in nodes])
        G.add_edges_from([(row.source_id, row.target_id) for row in edges])

        return nx.degree_centrality(G)

    @staticmethod
    def pagerank(db: Session, iterations: int = 100):
        query = text("SELECT id, label FROM nodes")
        nodes = db.execute(query).fetchall()
        query = text("SELECT source_id, target_id FROM edges")
        edges = db.execute(query).fetchall()

        G = nx.Graph()
        G.add_nodes_from([row.id for row in nodes])
        G.add_edges_from([(row.source_id, row.target_id) for row in edges])

        return nx.pagerank(G, iterations=iterations)

    @staticmethod
    def shortest_path(db: Session, source: str, target: str):
        # Simple BFS for unweighted
        query = text("""
            WITH RECURSIVE path AS (
                SELECT source_id, target_id, ARRAY[source_id] as path
                FROM edges WHERE source_id = :source
                UNION ALL
                SELECT e.source_id, e.target_id, p.path || e.target_id
                FROM edges e JOIN path p ON e.source_id = p.target_id
                WHERE e.target_id != ALL(p.path)
            )
            SELECT path FROM path WHERE target_id = :target LIMIT 1
        """)
        result = db.execute(query, {"source": source, "target": target}).fetchone()
        return result.path if result else None
        