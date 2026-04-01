require("dotenv").config();
const express = require("express");
const cors = require("cors");
const summarizeRoute = require("./routes/summarize.route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/summarize", summarizeRoute);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "PDF Summarizer API is running." });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(400).json({ success: false, error: err.message });
});

app.listen(PORT, () => {
  console.log(`PDF Summarizer API running on http://localhost:${PORT}`);
});
