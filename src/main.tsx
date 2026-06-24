import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './LanguageContext.tsx';
import { NetworkProvider } from './NetworkContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NetworkProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </NetworkProvider>
  </StrictMode>,
);

