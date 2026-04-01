import '../cssmodule/summary.css';

function LoadingSkeleton() {
  return (
    <div className="summary" id="loading-skeleton">
      <div className="summary__card">
        <div className="summary__header">
          <div className="summary__header-left">
            <div className="summary__icon" style={{ opacity: 0.5 }}>⏳</div>
            <div>
              <div className="summary__label">Generating summary...</div>
              <div className="summary__filename" style={{ opacity: 0.5 }}>Please wait</div>
            </div>
          </div>
        </div>
        <div className="summary__skeleton">
          <div className="summary__skeleton-line" style={{ width: '100%' }}></div>
          <div className="summary__skeleton-line"></div>
          <div className="summary__skeleton-line"></div>
          <div className="summary__skeleton-line"></div>
          <div className="summary__skeleton-line"></div>
          <div className="summary__skeleton-line"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
