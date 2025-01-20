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
      model: "gpt-3.5-turbo",
      stream: true,
      temperature: 0, // “Focused” answers can be faster
      max_tokens: 500, // Shorter potential response
      messages: [
        { role: "system", content: "You are an expert at analyzing code for time and space complexity." },
        { role: "user", content: `Analyze this code... ${code}` },
      ],
    });
    // Clean up the GPT output to remove any hidden characters:
    const rawContent = completion.choices[0].message.content;
    const cleanedContent = rawContent
      .replace(/^\u200B+/, "") // Zero-width spaces
      .replace(/^\uFEFF/, "") // Byte-order mark
      .trim(); // Standard whitespace

    console.log("Debugging server output -> cleanedContent:");
    for (let i = 0; i < cleanedContent.length; i++) {
      console.log(`Index ${i}:`, cleanedContent[i], cleanedContent.charCodeAt(i));
    }
    // Send back the cleaned response
    res.json({ analysis: cleanedContent });
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    res.status(500).json({ error: "Failed to analyze the code." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
