import { useEffect } from 'react';
import GraphCanvas from './components/canvas/GraphCanvas';
import Toolbar from './components/ui/Toolbar';
import Sidebar from './components/ui/Sidebar';
import LiveFeed from './components/ingestion/LiveFeed';
import { useGraphStore } from './store/graphSlice';

function App() {
  const setGraph = useGraphStore(state => state.setGraph);

  useEffect(() => {
    Promise.all([
      fetch('/api/nodes/').then(res => res.json()),
      fetch('/api/edges/').then(res => res.json())
    ]).then(([nodes, edges]) => {
      const mappedEdges = edges.map((e: any) => ({
        ...e,
        source: e.source_id,
        target: e.target_id
      }));
      setGraph(nodes, mappedEdges);
    }).catch(err => console.error('Failed to load graph data:', err));
  }, [setGraph]);

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
