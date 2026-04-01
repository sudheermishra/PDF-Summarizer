import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './cssmodule/global.css';
import App from './App.jsx';

// Set default theme
if (!document.documentElement.getAttribute('data-theme')) {
  const saved = localStorage.getItem('pdf-summarizer-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
