import React from 'react';
import { ThemeProvider } from '../ThemeProvider';
import GetCurrentUserProvider from '../GetCurrentUserProvider';
import GetDataProvider from '../GetDataProvider';
import { SocketProvider } from '../SocketProvider';

interface AppProviderProps {
  children: React.ReactNode;
}
const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider>
      <GetCurrentUserProvider>
        <GetDataProvider>
          <SocketProvider>{children}</SocketProvider>
        </GetDataProvider>
      </GetCurrentUserProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
