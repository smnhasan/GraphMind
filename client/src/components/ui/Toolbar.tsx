
import { useUIStore } from '../../store/uiSlice';

export default function Toolbar() {
  const { toggleSidebar, setActivePanel } = useUIStore();

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 56,
      background: '#0f172a',
      borderBottom: '1px solid #334155',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      zIndex: 101,
      gap: 12
    }}>
      <button onClick={toggleSidebar} style={{ padding: '8px 16px' }}>☰ Sidebar</button>
      <button onClick={() => setActivePanel('ingest')} style={{ padding: '8px 16px' }}>➕ Ingest</button>
    </div>
  );
}
