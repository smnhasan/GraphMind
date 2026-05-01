import { create } from 'zustand';
import { GraphNode, GraphEdge, GraphState } from '../types/graph';

interface GraphStore extends GraphState {
  addNode: (node: GraphNode) => void;
  addEdge: (edge: GraphEdge) => void;
  updateNode: (id: string, updates: Partial<GraphNode>) => void;
  removeEdge: (id: string | number) => void;
  setSelectedNode: (id: string | null) => void;
  setSelectedEdge: (id: string | number | null) => void;
  setGraph: (nodes: GraphNode[], edges: GraphEdge[]) => void;
}

export const useGraphStore = create<GraphStore>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  selectedEdgeId: null,

  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
  updateNode: (id, updates) => set((state) => ({
    nodes: state.nodes.map(n => n.id === id ? { ...n, ...updates } : n)
  })),
  removeEdge: (id) => set((state) => ({
    edges: state.edges.filter(e => e.id !== id)
  })),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  setSelectedEdge: (id) => set({ selectedEdgeId: id }),
  setGraph: (nodes, edges) => set({ nodes, edges }),
}));

