from .lexer import Lexer
from .ast_nodes import QueryAST, MatchClause, NodePattern, RelationshipPattern, ReturnClause

class Parser:
    def __init__(self):
        self.lexer = Lexer()

    def parse(self, query: str) -> QueryAST:
        tokens = self.lexer.tokenize(query)
        # Very simple parser for demo (MATCH (n:Person)-[r:KNOWS]->(m) RETURN n,m)
        return QueryAST(
            match=MatchClause(
                nodes=[NodePattern("n", "Person"), NodePattern("m", None)],
                relationships=[RelationshipPattern("r", "KNOWS")]
            ),
            where=None,
            return_clause=ReturnClause(["n", "m"])
        )
        