import GraphCanvas from './components/canvas/GraphCanvas';
import Toolbar from './components/ui/Toolbar';
import Sidebar from './components/ui/Sidebar';
import LiveFeed from './components/ingestion/LiveFeed';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Toolbar />
      <GraphCanvas />
      <Sidebar />
      <LiveFeed />
    </div>
  );
}

export default App;
