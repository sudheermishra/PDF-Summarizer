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
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              width="24"
              height="24"
              fill="currentColor">
              <path d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z" />
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
