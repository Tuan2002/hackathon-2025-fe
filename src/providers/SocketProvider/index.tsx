import type { DefaultEventsMap } from '@socket.io/component-emitter';
import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import ENVIRONMENT from '@/constants/env';

// Tạo context
const SocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

// Custom hook dùng context
export const useSocket = () => {
  return useContext(SocketContext);
};

// Provider bọc app
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

  useEffect(() => {
    const newSocket = io(`${ENVIRONMENT.BACKEND_URL}/document-chat`, {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('✅ Connected to socket');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
