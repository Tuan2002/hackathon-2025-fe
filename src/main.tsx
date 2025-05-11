import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import AppProvider from './providers/AppProvider/index.tsx';

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
