import React, { useState } from 'react';
import { useGraphStore } from '../../store/graphSlice';

export default function IngestPanel() {
  const [label, setLabel] = useState('');
  const { addNode } = useGraphStore();

  const handleSubmit = () => {
    addNode({
      id: 'node-' + Date.now(),
      label,
      properties: {}
    });
    setLabel('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quick Ingest</h2>
      <input 
        placeholder="Node Label" 
        value={label} 
        onChange={(e) => setLabel(e.target.value)} 
      />
      <button onClick={handleSubmit}>Add Node</button>
    </div>
  );
}
