export type GraphEvent = 
  | NodeAdded 
  | EdgeAdded 
  | NodeUpdated 
  | EdgeRemoved;

export interface NodeAdded {
  type: "NodeAdded";
  node_id: string;
  label: string;
  properties: Record<string, any>;
  timestamp: string;
}

export interface EdgeAdded {
  type: "EdgeAdded";
  edge_id: number;
  source_id: string;
  target_id: string;
  label: string;
  properties: Record<string, any>;
  timestamp: string;
}

export interface NodeUpdated {
  type: "NodeUpdated";
  node_id: string;
  label: string;
  properties: Record<string, any>;
  timestamp: string;
}

export interface EdgeRemoved {
  type: "EdgeRemoved";
  edge_id: number;
  source_id: string;
  target_id: string;
  timestamp: string;
}
