
import { useUIStore } from '../../store/uiSlice';
import NodeInspector from '../inspector/NodeInspector';
import EdgeInspector from '../inspector/EdgeInspector';
import IngestPanel from '../ingestion/IngestPanel';

export default function Sidebar() {
  const { isSidebarOpen, activePanel, selectedNode, selectedEdge } = useUIStore();

  if (!isSidebarOpen) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: 380,
      height: '100%',
      background: '#1e2937',
      color: '#e2e8f0',
      borderLeft: '1px solid #334155',
      overflowY: 'auto',
      zIndex: 100
    }}>
      {activePanel === 'node' && selectedNode && <NodeInspector node={selectedNode} />}
      {activePanel === 'edge' && selectedEdge && <EdgeInspector edge={selectedEdge} />}
      {activePanel === 'ingest' && <IngestPanel />}
    </div>
  );
}
