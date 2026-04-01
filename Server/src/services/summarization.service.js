const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Summarizes the given text using Groq SDK directly.
 * @param {string} text - The extracted PDF text.
 * @returns {Promise<string>} - The generated summary.
 */

async function summarizeText(text) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a professional assistant that provides concise, high-quality summaries of PDF documents.",
        },
        {
          role: "user",
          content: `Write a concise summary of the following PDF text:\n\n${text.slice(0, 30000)}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
    });

    return (
      chatCompletion.choices[0]?.message?.content || "No summary generated."
    );
  } catch (error) {
    console.error("Groq Direct API Error:", error.message);
    throw error;
  }
}

module.exports = { summarizeText };
