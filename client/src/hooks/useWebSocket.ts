import { useEffect, useState } from 'react';
import { socketService } from '../services/socket';
import { GraphEvent } from '../types/events';
import { useGraphStore } from '../store/graphSlice';

export function useWebSocket() {
  const [events, setEvents] = useState<GraphEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketService.connect();
    setIsConnected(true);

    const handleEvent = (event: GraphEvent) => {
      setEvents(prev => [event, ...prev].slice(0, 50)); // keep last 50 events
      
      // Update graph store directly
      if (event.type === 'NodeAdded') {
        useGraphStore.getState().addNode({
          id: event.node_id,
          label: event.label,
          properties: event.properties
        });
      } else if (event.type === 'EdgeAdded') {
        useGraphStore.getState().addEdge({
          id: event.edge_id,
          source: event.source_id,
          target: event.target_id,
          label: event.label,
          properties: event.properties
        });
      }
    };

    socketService.onEvent(handleEvent);

    return () => {
      // socketService.disconnect(); // keep open for now
    };
  }, []);

  return { events, isConnected };
}
