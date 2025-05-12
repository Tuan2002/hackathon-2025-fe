import React from 'react';
import { ThemeProvider } from '../ThemeProvider';
import GetCurrentUserProvider from '../GetCurrentUserProvider';

interface AppProviderProps {
  children: React.ReactNode;
}
const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider>
      <GetCurrentUserProvider>{children}</GetCurrentUserProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
