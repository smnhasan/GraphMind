import React, { useState } from 'react';
import { useGraphStore } from '../../store/graphSlice';

export default function IngestPanel() {
  const [label, setLabel] = useState('');
  const [nodeId, setNodeId] = useState('');
  const { addNode } = useGraphStore();

  const handleAddNode = () => {
    if (!label) return;
    addNode({
      id: nodeId || 'node-' + Date.now(),
      label,
      properties: {}
    });
    setLabel('');
    setNodeId('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quick Node Ingestion</h2>
      <input 
        placeholder="Node ID (optional)" 
        value={nodeId} 
        onChange={(e) => setNodeId(e.target.value)} 
        style={{ display: 'block', marginBottom: 8, width: '100%' }}
      />
      <input 
        placeholder="Label" 
        value={label} 
        onChange={(e) => setLabel(e.target.value)} 
        style={{ display: 'block', marginBottom: 12, width: '100%' }}
      />
      <button onClick={handleAddNode} style={{ padding: '8px 16px' }}>Add Node to Graph</button>
    </div>
  );
}
