from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Use absolute imports from server root
from server.core.config import settings
from server.api.routes.nodes import router as nodes_router
from server.api.routes.edges import router as edges_router
from server.api.routes.import_export import router as import_router
from server.api.websocket import router as websocket_router

app = FastAPI(
    title="GraphMind API",
    description="Real-time Graph Database & Visualization Platform",
    version="0.2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(nodes_router, prefix="/api/nodes", tags=["nodes"])
app.include_router(edges_router, prefix="/api/edges", tags=["edges"])
app.include_router(import_router, prefix="/api", tags=["import"])
app.include_router(websocket_router, prefix="/api", tags=["websocket"])

@app.get("/")
async def root():
    return {"message": "🚀 GraphMind API is running - WebSocket ready at /api/ws"}
    