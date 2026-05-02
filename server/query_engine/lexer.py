import re

class Token:
    def __init__(self, type: str, value: str):
        self.type = type
        self.value = value

class Lexer:
    def __init__(self):
        self.tokens = []

    def tokenize(self, query: str):
        # Simple Cypher-like lexer
        patterns = [
            (r'\s+', None),  # whitespace
            (r'MATCH', 'MATCH'),
            (r'WHERE', 'WHERE'),
            (r'RETURN', 'RETURN'),
            (r'\(', 'LPAREN'),
            (r'\)', 'RPAREN'),
            (r'->', 'ARROW'),
            (r':([A-Za-z]+)', 'LABEL'),
            (r'([A-Za-z0-9_]+)', 'IDENTIFIER'),
            (r'"([^"]*)"', 'STRING'),
        ]

        pos = 0
        while pos < len(query):
            for regex, token_type in patterns:
                match = re.match(regex, query[pos:])
                if match:
                    if token_type:
                        self.tokens.append(Token(token_type, match.group(0).strip()))
                    pos += len(match.group(0))
                    break
            else:
                pos += 1
        return self.tokens
        