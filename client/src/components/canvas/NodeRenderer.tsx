import React from 'react';
import { GraphNode } from '../../types/graph';

interface NodeRendererProps {
  node: GraphNode;
  isSelected: boolean;
  onClick: (node: GraphNode) => void;
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({ node, isSelected, onClick }) => {
  const color = node.label === 'Person' ? '#4ade80' : '#60a5fa';
  const size = Math.max(8, Math.min(20, 8 + Object.keys(node.properties).length));

  return (
    <g 
      onClick={() => onClick(node)} 
      style={{ cursor: 'pointer' }}
      transform={`translate(${node.x || 0}, ${node.y || 0})`}
    >
      <circle
        r={size}
        fill={color}
        stroke={isSelected ? '#fff' : '#1e2937'}
        strokeWidth={isSelected ? 3 : 2}
      />
      <text
        textAnchor="middle"
        dy=".35em"
        fill="#fff"
        fontSize="10"
        fontWeight="500"
      >
        {node.label[0]}
      </text>
    </g>
  );
};
