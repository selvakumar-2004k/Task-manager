import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Tell TypeScript that we guarantee an element with id='root' exists
const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    {/* This wrapper applies our clean global font and removes default browser margins */}
    <div style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif', minHeight: '100vh', margin: 0, padding: 0, boxSizing: 'border-box' }}>
      <App />
    </div>
  </StrictMode>
);