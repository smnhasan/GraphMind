import { create } from 'zustand';
import { GraphNode, GraphEdge } from '../types/graph';

interface UIState {
  selectedNode: GraphNode | null;
  selectedEdge: GraphEdge | null;
  isSidebarOpen: boolean;
  activePanel: 'node' | 'edge' | 'ingest' | null;
  setSelectedNode: (node: GraphNode | null) => void;
  setSelectedEdge: (edge: GraphEdge | null) => void;
  toggleSidebar: () => void;
  setActivePanel: (panel: 'node' | 'edge' | 'ingest' | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedNode: null,
  selectedEdge: null,
  isSidebarOpen: true,
  activePanel: null,

  setSelectedNode: (node) => set({ selectedNode: node, activePanel: node ? 'node' : null }),
  setSelectedEdge: (edge) => set({ selectedEdge: edge, activePanel: edge ? 'edge' : null }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActivePanel: (panel) => set({ activePanel: panel }),
}));
