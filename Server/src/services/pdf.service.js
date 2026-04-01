const pdfParse = require("pdf-parse");

/**
 * Extracts text content from a PDF buffer.
 * @param {Buffer} pdfBuffer - The PDF file buffer (from multer).
 * @returns {Promise<string>} - The extracted text.
 */
async function extractTextFromPDF(pdfBuffer) {
  const data = await pdfParse(pdfBuffer);

  if (!data.text || data.text.trim().length === 0) {
    throw new Error("Could not extract any text from the PDF.");
  }
  return data.text;
}

module.exports = { extractTextFromPDF };
