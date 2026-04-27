import { GraphEvent } from '../types/events';

class SocketService {
  private socket: WebSocket | null = null;
  private listeners: ((event: GraphEvent) => void)[] = [];

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN) return;

    this.socket = new WebSocket('ws://localhost:8000/api/ws');

    this.socket.onmessage = (event) => {
      try {
        const data: GraphEvent = JSON.parse(event.data);
        this.listeners.forEach(listener => listener(data));
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected. Reconnecting in 3s...');
      setTimeout(() => this.connect(), 3000);
    };

    this.socket.onerror = (err) => console.error('WebSocket error:', err);
  }

  onEvent(callback: (event: GraphEvent) => void) {
    this.listeners.push(callback);
  }

  disconnect() {
    this.socket?.close();
  }
}

export const socketService = new SocketService();
