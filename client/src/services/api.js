const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";

/**
 * Uploads a PDF file and returns the AI-generated summary.
 * @param {File} file - The PDF file to summarize.
 * @returns {Promise<{ filename: string, originalTextLength: number, summary: string }>}
 */

export async function summarizePDF(file) {
  const formData = new FormData();
  formData.append("file", file);

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
}

/**
 * Checks if the API server is reachable.
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const response = await fetch(API_BASE, {
      signal: AbortSignal.timeout(3000),
    });
    const data = await response.json();
    return data.status === "ok";
  } catch {
    return false;
  }
}
