import LiveFeed from './components/ingestion/LiveFeed';

function App() {
  return (
    <div style={{ padding: '3rem', fontFamily: 'system-ui', textAlign: 'center' }}>
      <h1>🌐 GraphMind — Phase 2 Live</h1>
      <p><strong>Real-time WebSocket Ingestion Active</strong></p>
      <p>Send events via API or test tools → see them appear live on the right.</p>
      
      <LiveFeed />
    </div>
  );
}

export default App;
