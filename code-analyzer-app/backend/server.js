const express = require("express");
const OpenAI = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route for code analysis
app.post("/analyze", async (req, res) => {
  const { code } = req.body; // Get code from the request body

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing code for time and space complexity.",
        },
        {
          role: "user",
          content: `Analyze this code and provide its time and space complexity:\n\n${code}`,
        },
      ],
    });

    // Send back the response
    res.json({ analysis: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    res.status(500).json({ error: "Failed to analyze the code." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
