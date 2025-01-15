import React, { useState } from "react";
import { analyzeCode } from "./api"; // Import the API call function

function App() {
  const [code, setCode] = useState(""); // State for user input
  const [result, setResult] = useState(""); // State for analysis result
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please enter some code to analyze!");
      return;
    }

    setLoading(true);
    setResult(""); // Clear previous result

    try {
      const analysis = await analyzeCode(code); // Call the API
      setResult(analysis); // Update the result with API response
    } catch (error) {
      console.error("Error analyzing code:", error.message);
      setResult("Failed to analyze the code. Please try again.");
    } finally {
      setLoading(false); // Turn off the loading state
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Code Complexity Analyzer</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Paste your code here..."
        rows={8}
        value={code}
        onChange={(e) => setCode(e.target.value)} // Update `code` state
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        onClick={handleAnalyze}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Analyzing..." : "Analyze Code"}
      </button>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h2 className="font-semibold">Analysis Result:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
