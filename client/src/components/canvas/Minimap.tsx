import React from 'react';

export default function Minimap() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: 20,
      width: 180,
      height: 120,
      border: '2px solid #334155',
      background: '#1e2937',
      borderRadius: 6,
      overflow: 'hidden'
    }}>
      <div style={{ color: '#94a3b8', textAlign: 'center', padding: '4px', fontSize: 12 }}>
        Minimap (Coming soon)
      </div>
    </div>
  );
}
