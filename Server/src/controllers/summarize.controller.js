const { extractTextFromPDF } = require("../services/pdf.service");
const { summarizeText } = require("../services/summarization.service");

/**
 * Handles the PDF summarization request.
 * Expects a PDF file uploaded via multipart/form-data with field name "file".
 */

async function summarizePDF(req, res) {
  try {
    // 1. Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error:
          "No file uploaded. Please upload a PDF file with field name 'file'.",
      });
    }

    // 2. Validate file type
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        error: "Invalid file type. Only PDF files are accepted.",
      });
    }

    console.log(
      `Processing PDF: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)`,
    );

    // 3. Extract text from the PDF buffer
    const text = await extractTextFromPDF(req.file.buffer);
    console.log(`Extracted ${text.length} characters from PDF.`);

    // 4. Summarize the text
    const summary = await summarizeText(text);

    // 5. Return the summary
    return res.status(200).json({
      success: true,
      data: {
        filename: req.file.originalname,
        originalTextLength: text.length,
        summary: summary,
      },
    });
  } catch (error) {
    console.error("Summarization error:", error.message);
    
    const isClientError = error.message.includes('XRef') || error.message.includes('PDF') || error.message.includes('extract');
    const statusCode = isClientError ? 400 : 500;
    
    let errorMessage = error.message || "An error occurred while summarizing the PDF.";
    if (errorMessage.includes("bad XRef entry")) {
      errorMessage = "The uploaded PDF file is corrupted or structurally invalid (bad XRef entry). Please try a different PDF.";
    }

    return res.status(statusCode).json({
      success: false,
      error: errorMessage,
    });
  }
}

module.exports = { summarizePDF };
