import { useState } from 'react';

interface Props {
  properties: Record<string, any>;
  onSave: (newProps: Record<string, any>) => void;
}

export default function PropertyTable({ properties, onSave }: Props) {
  const [editingProps, setEditingProps] = useState(properties);

  const handleSave = () => onSave(editingProps);

  return (
    <div>
      {Object.entries(editingProps).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', margin: '8px 0' }}>
          <strong style={{ width: 120 }}>{key}:</strong>
          <input 
            value={value} 
            onChange={(e) => setEditingProps({ ...editingProps, [key]: e.target.value })}
            style={{ flex: 1, background: '#334155', color: '#e2e8f0', border: 'none', padding: 4 }}
          />
        </div>
      ))}
      <button onClick={handleSave} style={{ marginTop: 12 }}>Save Changes</button>
    </div>
  );
}
