import GraphCanvas from './components/canvas/GraphCanvas';
import LiveFeed from './components/ingestion/LiveFeed';
import Minimap from './components/canvas/Minimap';
import Legend from './components/canvas/Legend';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <GraphCanvas />
      <LiveFeed />
      <Minimap />
      <Legend />
    </div>
  );
}

export default App;
