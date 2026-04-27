import { useWebSocket } from '../../hooks/useWebSocket';

export default function LiveFeed() {
  const { events, isConnected } = useWebSocket();

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      width: 380,
      background: '#1e1e1e',
      color: '#fff',
      borderRadius: 8,
      padding: 16,
      fontFamily: 'monospace',
      fontSize: 13,
      maxHeight: '60vh',
      overflowY: 'auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      zIndex: 1000
    }}>
      <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Live Events Feed {isConnected ? '🟢' : '🔴'}</strong>
        <span>{events.length} events</span>
      </div>

      {events.length === 0 && <div style={{ color: '#888', fontStyle: 'italic' }}>Waiting for events...</div>}

      {events.map((event, i) => (
        <div key={i} style={{
          padding: '8px 10px',
          background: '#2a2a2a',
          marginBottom: 6,
          borderRadius: 4,
          borderLeft: `4px solid ${event.type === 'NodeAdded' ? '#4ade80' : '#60a5fa'}`
        }}>
          <strong>{event.type}</strong><br />
          <small style={{ color: '#aaa' }}>
            {new Date(event.timestamp).toLocaleTimeString()}
          </small>
        </div>
      ))}
    </div>
  );
}
