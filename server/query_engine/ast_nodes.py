from dataclasses import dataclass
from typing import List, Optional

@dataclass
class NodePattern:
    variable: str
    label: Optional[str]

@dataclass
class RelationshipPattern:
    variable: str
    type: str

@dataclass
class MatchClause:
    nodes: List[NodePattern]
    relationships: List[RelationshipPattern]

@dataclass
class ReturnClause:
    items: List[str]

@dataclass
class QueryAST:
    match: MatchClause
    where: Optional[str]
    return_clause: ReturnClause
    