import { useState, useCallback } from "react";
import UploadBox from "../components/UploadBox";
import SummaryDisplay from "../components/SummaryDisplay";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { summarizePDF } from "../services/api";
import "../cssmodule/home.css";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = useCallback((file) => {
    // Validate file type
    if (file.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }
    // Validate file size (10 MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10 MB limit.");
      return;
    }

    setSelectedFile(file);
    setError("");
    setSummaryData(null);
  }, []);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setError("");
    setSummaryData(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError("");
    setSummaryData(null);

    try {
      const result = await summarizePDF(selectedFile);
      setSummaryData(result);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  const handleNewSummary = () => {
    setSelectedFile(null);
    setSummaryData(null);
    setError("");
  };

  return (
    <main className="home" id="home-page">
      {/* Hero Section */}
      <section className="home__hero">
        <h1 className="home__title">
          Summarize any PDF{" "}
          <span className="home__title-gradient">in seconds</span>
        </h1>
        <p className="home__description">
          Upload your PDF document and let our AI-powered engine extract the key
          insights and generate a concise, readable summary instantly.
        </p>

        {/* Feature pills */}
        <div className="home__features">
          <div className="home__feature">
            <span>Lightning Fast</span>
          </div>
          <div className="home__feature">
            <span>Secure & Private</span>
          </div>
          <div className="home__feature">
            <span>Accurate Results</span>
          </div>
        </div>
      </section>

      {/* Upload or Summary */}
      {summaryData ? (
        <>
          <SummaryDisplay data={summaryData} />
          <button
            className="home__new-btn"
            onClick={handleNewSummary}
            id="new-summary-btn">
            Summarize Another PDF
          </button>
        </>
      ) : isLoading ? (
        <LoadingSkeleton />
      ) : (
        <UploadBox
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
          onRemoveFile={handleRemoveFile}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      )}
    </main>
  );
}

export default Home;
