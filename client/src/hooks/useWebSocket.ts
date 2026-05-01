import { useEffect, useState } from 'react';
import { socketService } from '../services/socket';
import { GraphEvent } from '../types/events';

export function useWebSocket() {
  const [events, setEvents] = useState<GraphEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketService.connect();
    setIsConnected(true);

    const handleEvent = (event: GraphEvent) => {
      setEvents(prev => [event, ...prev].slice(0, 50)); // keep last 50 events
    };

    socketService.onEvent(handleEvent);

    return () => {
      // socketService.disconnect(); // keep open for now
    };
  }, []);

  return { events, isConnected };
}
