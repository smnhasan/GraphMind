export interface GraphNode {
  id: string;
  label: string;
  properties: Record<string, any>;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdge {
  id: string | number;
  source: string;
  target: string;
  label: string;
  properties: Record<string, any>;
}

export interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
}
