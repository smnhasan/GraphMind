import React from 'react';
import { GraphEdge } from '../../types/graph';

interface EdgeRendererProps {
  edge: GraphEdge;
  isSelected: boolean;
}

export const EdgeRenderer: React.FC<EdgeRendererProps> = ({ edge, isSelected }) => {
  return (
    <line
      stroke={isSelected ? '#facc15' : '#64748b'}
      strokeWidth={isSelected ? 3 : 1.5}
      strokeDasharray={edge.label === 'KNOWS' ? 'none' : '4,2'}
      markerEnd="url(#arrow)"
    />
  );
};
