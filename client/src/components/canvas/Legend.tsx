import React from 'react';

export default function Legend() {
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      background: '#1e2937',
      padding: 12,
      borderRadius: 8,
      color: '#e2e8f0',
      fontSize: 13
    }}>
      <div>Node Types:</div>
      <div style={{ color: '#4ade80' }}>• Person</div>
      <div style={{ color: '#60a5fa' }}>• Other</div>
    </div>
  );
}
