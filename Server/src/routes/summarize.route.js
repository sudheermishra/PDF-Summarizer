const express = require("express");
const multer = require("multer");
const { summarizePDF } = require("../controllers/summarize.controller");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."), false);
    }
  },
});

router.post("/", upload.single("file"), summarizePDF);

module.exports = router;
