import { useState, useRef, useCallback } from "react";
import "../cssmodule/uploadbox.css";

function UploadBox({
  onFileSelect,
  selectedFile,
  onRemoveFile,
  onSubmit,
  isLoading,
  error,
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set inactive when leaving the dropzone itself
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type === "application/pdf") {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect],
  );

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
    // Reset input so the same file can be re-selected
    e.target.value = "";
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="upload" id="upload-section">
      {/* Drop zone */}
      <div
        className={`upload__dropzone ${isDragActive ? "upload__dropzone--active" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        role="button"
        tabIndex={0}
        aria-label="Upload PDF file"
        id="upload-dropzone">
        <div className="upload__icon-wrapper">
          <span className="upload__icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </span>
        </div>
        <h3 className="upload__title">
          {isDragActive ? "Drop your PDF here" : "Drag & drop your PDF"}
        </h3>
        <p className="upload__subtitle">or click to browse files</p>
        <span className="upload__browse-btn">Select PDF</span>
        <p className="upload__constraints">PDF only · Max 10 MB</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="upload__input"
        onChange={handleInputChange}
        id="upload-file-input"
      />

      {/* Selected file card */}
      {selectedFile && (
        <div className="upload__file-info" id="selected-file-card">
          <div className="upload__file-icon">📄</div>
          <div className="upload__file-details">
            <div className="upload__file-name">{selectedFile.name}</div>
            <div className="upload__file-size">
              {formatFileSize(selectedFile.size)}
            </div>
          </div>
          <button
            className="upload__file-remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFile();
            }}
            aria-label="Remove file"
            id="remove-file-btn">
            ✕
          </button>
        </div>
      )}

      {/* Submit button */}
      {selectedFile && (
        <button
          className="upload__submit"
          onClick={onSubmit}
          disabled={isLoading}
          id="summarize-btn">
          {isLoading ? (
            <>
              <span
                className="home__processing-spinner"
                style={{
                  width: 20,
                  height: 20,
                  margin: 0,
                  borderWidth: 2,
                }}></span>
              Processing...
            </>
          ) : (
            <>Summarize PDF</>
          )}
        </button>
      )}

      {/* Error */}
      {error && (
        <div className="upload__error" id="upload-error-msg">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

export default UploadBox;
