import React from 'react';
import { ThemeProvider } from '../ThemeProvider';
import GetCurrentUserProvider from '../GetCurrentUserProvider';
import GetDataProvider from '../GetDataProvider';

interface AppProviderProps {
  children: React.ReactNode;
}
const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider>
      <GetCurrentUserProvider>
        <GetDataProvider>{children}</GetDataProvider>
      </GetCurrentUserProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
