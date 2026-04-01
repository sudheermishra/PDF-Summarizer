import { useState } from 'react';
import '../cssmodule/summary.css';

function SummaryDisplay({ data }) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const { filename, originalTextLength, summary } = data;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = summary;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const wordCount = summary.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="summary" id="summary-section">
      <div className="summary__card">
        {/* Header */}
        <div className="summary__header">
          <div className="summary__header-left">
            <div className="summary__icon">✅</div>
            <div>
              <div className="summary__label">Summary</div>
              <div className="summary__filename">{filename}</div>
            </div>
          </div>
          <button
            className={`summary__copy-btn ${copied ? 'summary__copy-btn--copied' : ''}`}
            onClick={handleCopy}
            id="copy-summary-btn"
          >
            {copied ? (
              <>✓ Copied</>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>

        {/* Body */}
        <div className="summary__body">
          <p className="summary__text" id="summary-text">{summary}</p>
        </div>

        {/* Meta */}
        <div className="summary__meta">
          <span className="summary__meta-item">
            📝 {wordCount} words
          </span>
          <span className="summary__meta-item">
            ⏱ {readTime} min read
          </span>
          <span className="summary__meta-item">
            📄 {originalTextLength.toLocaleString()} chars extracted
          </span>
        </div>
      </div>
    </div>
  );
}

export default SummaryDisplay;
