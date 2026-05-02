import React from 'react';
import { GraphNode } from '../../types/graph';
import PropertyTable from './PropertyTable';
import { useGraphStore } from '../../store/graphSlice';

interface Props {
  node: GraphNode;
}

export default function NodeInspector({ node }: Props) {
  const { updateNode } = useGraphStore();

  return (
    <div style={{ padding: 20 }}>
      <h2>Node Inspector</h2>
      <p><strong>ID:</strong> {node.id}</p>
      <p><strong>Label:</strong> {node.label}</p>
      <PropertyTable 
        properties={node.properties} 
        onSave={(newProps) => updateNode(node.id, { properties: newProps })} 
      />
    </div>
  );
}
