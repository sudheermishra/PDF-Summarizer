// /* ============================================================
//    API Service — PDF Summarizer (api.js)
//    ============================================================ */

// const API_BASE = 'http://localhost:3001/api';

// /**
//  * Uploads a PDF file and returns the AI-generated summary.
//  * @param {File} file - The PDF file to summarize.
//  * @returns {Promise<{ filename: string, originalTextLength: number, summary: string }>}
//  */
// export async function summarizePDF(file) {
//   const formData = new FormData();
//   formData.append('file', file);

//   const response = await fetch(`${API_BASE}/summarize`, {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await response.json();

//   if (!response.ok || !data.success) {
//     throw new Error(data.error || 'Failed to summarize the PDF. Please try again.');
//   }

//   return data.data;
// }

// /**
//  * Checks if the API server is reachable.
//  * @returns {Promise<boolean>}
//  */
// export async function checkHealth() {
//   try {
//     const response = await fetch('http://localhost:3001/', { signal: AbortSignal.timeout(3000) });
//     const data = await response.json();
//     return data.status === 'ok';
//   } catch {
//     return false;
//   }
// }

/* ============================================================
   API Service — PDF Summarizer (api.js)
   ============================================================ */

// Determine the API base URL based on environment
const getAPIBase = () => {
  // Use process.env.REACT_APP_* (injected by React at build time)
  const environment =
    import.meta.env?.VITE_ENVIRONMENT ||
    process?.env?.REACT_APP_ENVIRONMENT ||
    "local";

  // For Vite projects
  if (typeof import.meta?.env !== "undefined") {
    if (environment === "server") {
      return (
        import.meta.env.VITE_API_BASE_SERVER ||
        "https://your-app-name.onrender.com/api"
      );
    }
    return import.meta.env.VITE_API_BASE_LOCAL || "http://localhost:3001/api";
  }

  // For Create React App (CRA) projects
  if (environment === "server") {
    return (
      window.REACT_APP_API_BASE_SERVER ||
      "https://your-app-name.onrender.com/api"
    );
  }

  // Default to local
  return window.REACT_APP_API_BASE_LOCAL || "http://localhost:3001/api";
};

const API_BASE = getAPIBase();

console.log(`🚀 API Base URL: ${API_BASE}`);

/**
 * Uploads a PDF file and returns the AI-generated summary.
 * @param {File} file - The PDF file to summarize.
 * @returns {Promise<{ filename: string, originalTextLength: number, summary: string }>}
 */
export async function summarizePDF(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE}/summarize`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.error || "Failed to summarize the PDF. Please try again.",
      );
    }

    return data.data;
  } catch (error) {
    console.error("PDF summarization error:", error);
    throw error;
  }
}

/**
 * Checks if the API server is reachable.
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const healthUrl = API_BASE.replace("/api", ""); // Get the base server URL
    const response = await fetch(healthUrl, {
      signal: AbortSignal.timeout(5000),
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("✓ API Health Check:", data);
    return data.status === "ok";
  } catch (error) {
    console.error("✗ API Health Check Failed:", error.message);
    return false;
  }
}

/**
 * Get current API configuration for debugging
 * @returns {Object}
 */
export function getAPIConfig() {
  // Check if using Vite or CRA
  const isVite = typeof import.meta?.env !== "undefined";

  return {
    buildTool: isVite ? "Vite" : "Create React App",
    environment: isVite
      ? import.meta.env.VITE_ENVIRONMENT
      : window.REACT_APP_ENVIRONMENT || "local",
    apiBase: API_BASE,
    localEndpoint: isVite
      ? import.meta.env.VITE_API_BASE_LOCAL
      : window.REACT_APP_API_BASE_LOCAL,
    serverEndpoint: isVite
      ? import.meta.env.VITE_API_BASE_SERVER
      : window.REACT_APP_API_BASE_SERVER,
  };
}
