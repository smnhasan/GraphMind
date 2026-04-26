<div align="center">

# 🧠 GraphMind

**A Neo4j-style knowledge graph platform with real-time visualization, live ingestion, and a Cypher-inspired query engine.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: In Development](https://img.shields.io/badge/Status-In%20Development-amber.svg)]()
[![Stack: React + FastAPI](https://img.shields.io/badge/Stack-React%20%2B%20FastAPI-teal.svg)]()

</div>

---

## What is GraphMind?

GraphMind is an open-source knowledge graph platform that lets you **ingest, visualize, and query connected data in real time** — without the overhead of a managed graph database.

Think of it as a self-hosted Neo4j alternative, built with a modern web stack. You define nodes and relationships, push them through the API or WebSocket, and watch your graph come alive on an interactive force-directed canvas — instantly, as data arrives.

Whether you're modeling knowledge bases, dependency trees, social networks, or semantic relationships, GraphMind gives you full control over your graph data with zero licensing cost.

---

## Goals

- **Democratize graph data** — make graph databases accessible without proprietary tooling or cloud lock-in
- **Real-time first** — every ingestion event is immediately reflected on the visualization canvas, with no polling or page refresh
- **Query without complexity** — provide an intuitive Cypher-inspired query language that non-experts can learn in minutes
- **Extensible by design** — clean separation between storage, event bus, and UI layers so each can evolve independently
- **Observable** — every node, edge, and query is inspectable; the graph is always the source of truth

---

## Features

### 🔗 Real-Time Graph Ingestion
- Push nodes and edges via REST API or WebSocket
- Each entity animates onto the live canvas the moment it arrives
- Supports batch import via JSON and CSV
- Event schema: `NodeAdded`, `EdgeAdded`, `NodeUpdated`, `EdgeRemoved`
- Deduplication and conflict resolution built in

### 🌐 Interactive Graph Visualization
- Force-directed layout powered by D3.js
- Smooth animated node entry and exit
- Pan, zoom, and drag to explore large graphs
- Node color and size encode type and degree (connectivity)
- Edge labels display relationship type and weight
- Click any node to open the inspector panel (properties, neighbors, paths)
- Minimap for navigating large graphs
- Legend auto-generated from node/edge type schema

### 🔍 Cypher-Inspired Query Engine
- Familiar `MATCH`, `WHERE`, `RETURN` syntax
- Path traversal and neighbor expansion
- Subgraph extraction and filtering by label or property
- Query results highlight matched nodes/edges directly on the canvas
- Query history, bookmarks, and autocomplete
- Explain plan viewer for debugging traversal performance

### ⚡ Graph Analytics
- Shortest path (BFS / Dijkstra)
- PageRank and centrality scoring
- Community detection (Louvain algorithm)
- Results rendered as color overlays on the live canvas
- Export analytics results as JSON or CSV

### 🗄️ Persistent Storage
- PostgreSQL with JSONB for nodes, edges, and properties
- Indexed by node label and edge type for fast traversal
- Adjacency-list structure for efficient path queries
- Optional Redis pub/sub layer for high-throughput ingestion

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     GraphMind Client                    │
│         React · D3.js Force Canvas · Query UI          │
└────────────────────────┬────────────────────────────────┘
                         │  REST + WebSocket
┌────────────────────────▼────────────────────────────────┐
│                    GraphMind API                        │
│              FastAPI · WebSocket Server                 │
│         Ingestion · Query Engine · Analytics            │
└──────────┬──────────────────────────┬───────────────────┘
           │                          │
┌──────────▼──────────┐   ┌──────────▼──────────┐
│    PostgreSQL        │   │       Redis          │
│  JSONB Graph Store   │   │   Pub/Sub Events     │
│  Nodes · Edges       │   │  (optional / scale)  │
└─────────────────────┘   └─────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 | Component UI, query interface |
| Visualization | D3.js (force-simulation) | Live graph canvas |
| Real-Time | WebSocket (Socket.io) | Event streaming to client |
| API | FastAPI (Python) | REST endpoints, WS server |
| Storage | PostgreSQL + JSONB | Persistent graph store |
| Cache / Events | Redis | Pub/sub for high-volume ingestion |
| Query Parser | Custom DSL (Python) | Cypher-subset lexer + AST |

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Redis (optional, for pub/sub mode)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/graphmind.git
cd graphmind

# Backend setup
cd server
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add your DB credentials

# Run migrations
python manage.py migrate

# Start the API server
uvicorn main:app --reload --port 8000

# Frontend setup (new terminal)
cd ../client
npm install
npm run dev
```

Open `http://localhost:5173` to access the GraphMind canvas.

---

## Usage

### Ingest a Node

```bash
curl -X POST http://localhost:8000/api/nodes \
  -H "Content-Type: application/json" \
  -d '{
    "id": "person-1",
    "label": "Person",
    "properties": {
      "name": "Ada Lovelace",
      "born": 1815
    }
  }'
```

### Ingest an Edge

```bash
curl -X POST http://localhost:8000/api/edges \
  -H "Content-Type: application/json" \
  -d '{
    "source": "person-1",
    "target": "person-2",
    "type": "KNOWS",
    "properties": { "since": 1840 }
  }'
```

### Query the Graph

```cypher
MATCH (a:Person)-[:KNOWS]->(b:Person)
WHERE a.name = "Ada Lovelace"
RETURN a, b
```

---

## Roadmap

### Phase 1 — Data Model & Storage `Week 1–2`
- [x] Node and edge schema design
- [ ] PostgreSQL JSONB tables and indexes
- [ ] REST CRUD API for nodes and edges
- [ ] Seed data loader and CSV importer

### Phase 2 — Real-Time Ingestion `Week 3–4`
- [ ] WebSocket server and event schema
- [ ] Client subscription model
- [ ] Deduplication and conflict handling
- [ ] Stress testing at 1,000+ nodes/min

### Phase 3 — Visualization Canvas `Week 5–7`
- [ ] D3 force-simulation integration
- [ ] Animated node/edge insertion
- [ ] Pan, zoom, node inspector panel
- [ ] Minimap and type legend

### Phase 4 — Query Engine `Week 8–10`
- [ ] Lexer and parser for Cypher subset
- [ ] AST → traversal translator
- [ ] Canvas result highlighting
- [ ] Autocomplete and query history

### Phase 5 — Analytics & Polish `Week 11–13`
- [ ] PageRank and centrality overlays
- [ ] Community detection (Louvain)
- [ ] Export (JSON / CSV / SVG)
- [ ] Multi-user sessions
- [ ] Full documentation

---

## Contributing

Contributions are welcome. To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feat/your-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages and open an issue before starting large features.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Built with curiosity. Powered by graphs.</sub>
</div>
