const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdf = require("pdf-parse");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();
app.use(express.json());
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

let documentText = "";

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  let dataBuffer = fs.readFileSync(req.file.path);

  pdf(dataBuffer).then(function (data) {
    documentText = data.text; 
    res.json({ text: data.text, filePath: req.file.path });
  });
});

app.post("/simplify", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Please simplify the following text for a non professional (generate response only , no prefix , no suffix):\n\n" + req.body.text,
    });
    res.json({ simplifiedText: response.text });
  } catch (error) {
    console.error("Error simplifying text:", error);
    res.status(500).send("Error simplifying text");
  }
});

app.get("/getFilePath", async (req, res) => {
  if (!currFilePath) {
    res.status(400).send("File not found");
  } else {
    res.json({ currFilePath: currFilePath });
  }
});

app.post("/chat", async (req, res) => {
  try {
    if (!documentText) {
      return res.status(400).send("No document uploaded for reference.");
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      role: "assistant",
      contents: `You are a legal assistant. Answer the user's question based on the legal document provided. If you don't have enough information, say "I don't know".\n\nLegal Document:\n\n${documentText}\n\nUser's Question:\n\n${req.body.question}`,
    });

    res.json({ answer: response.text });
  } catch (error) {
    console.error("Error processing chat request:", error);
    res.status(500).send("Error processing chat request");
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
