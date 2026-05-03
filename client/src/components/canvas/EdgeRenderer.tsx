import React from 'react';
import { GraphEdge } from '../../types/graph';

interface EdgeRendererProps {
  edge: GraphEdge;
  isSelected: boolean;
}

export const EdgeRenderer: React.FC<EdgeRendererProps> = ({ edge, isSelected }) => {
  const source = edge.source as any;
  const target = edge.target as any;

  return (
    <line
      x1={source?.x || 0}
      y1={source?.y || 0}
      x2={target?.x || 0}
      y2={target?.y || 0}
      stroke={isSelected ? '#facc15' : '#64748b'}
      strokeWidth={isSelected ? 3 : 1.5}
      strokeDasharray={edge.label === 'KNOWS' ? 'none' : '4,2'}
      markerEnd="url(#arrow)"
    />
  );
};
