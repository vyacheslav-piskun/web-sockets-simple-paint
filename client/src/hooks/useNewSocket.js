import { useEffect, useRef } from 'react';

const useNewSocket = () => {
  const socketRef = useRef(null);
  useEffect(() => {
    // const ws = new WebSocket('ws://192.168.1.112:5000');
    const ws = new WebSocket('ws://localhost:5000');
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({ type: 'info', message: 'connected on client side' }),
      );
    };
    return () => {
      ws.close();
    };
  }, []);

  return { ws: socketRef.current };
};

export default useNewSocket;
