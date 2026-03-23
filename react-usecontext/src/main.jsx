import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { TemaProvedor } from './contexts/TemaContexto.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TemaProvedor>
      <App />
    </TemaProvedor>
  </StrictMode>
);