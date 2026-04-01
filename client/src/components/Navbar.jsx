import { useState, useEffect } from 'react';
import '../cssmodule/navbar.css';

function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pdf-summarizer-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pdf-summarizer-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar__inner">
        <a href="/" className="navbar__brand">
          <div className="navbar__logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <span className="navbar__title">
            PDF <span className="navbar__title-accent">Summarizer</span>
          </span>
        </a>

        <div className="navbar__actions">
          <button
            className="navbar__theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            id="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
