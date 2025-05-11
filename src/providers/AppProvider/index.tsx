import React from 'react';
import { ThemeProvider } from '../ThemeProvider';

interface AppProviderProps {
  children: React.ReactNode;
}
const AppProvider = ({ children }: AppProviderProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default AppProvider;
