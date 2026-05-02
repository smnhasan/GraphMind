from sqlalchemy.orm import Session
from .parser import Parser
from .ast_nodes import QueryAST

class QueryExecutor:
    def __init__(self, db: Session):
        self.db = db
        self.parser = Parser()

    def execute(self, query_str: str):
        ast = self.parser.parse(query_str)
        # Translate to SQL for PostgreSQL JSONB
        sql = "SELECT * FROM nodes WHERE label = 'Person' LIMIT 10"
        result = self.db.execute(sql).fetchall()
        return [dict(row) for row in result]
        