import React, { useState } from "react";
import { analyzeCode } from "./api";
import CodeEditor from "./CodeEditor";
import AnimateText from "./AnimateText";

function App() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisText, setAnalysisText] = useState("");

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please enter some code to analyze!");
      return;
    }

    setLoading(true);
    setAnalysisText("");

    try {
      const analysis = await analyzeCode(code);
      console.log("Raw analysis string:", analysis);
      // No slicing or messing with the text here—just store the entire string.
      setAnalysisText(analysis);
    } catch (error) {
      console.error("Error analyzing code:", error);
      setAnalysisText("Failed to analyze the code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center p-4">
      <header className="w-full max-w-3xl pb-4 mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-white">Code Complexity Analyzer</h1>
        <p className="text-gray-400 text-lg mt-2">Paste your code below to analyze its time and space complexity.</p>
      </header>

      <div className="w-full max-w-3xl">
        <CodeEditor
          code={code}
          setCode={setCode}
        />
        <div className="flex justify-center mt-4">
          <button
            className="px-6 py-3 rounded-lg font-bold text-white bg-gray-900 hover:bg-gray-800 transition-all"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Code"}
          </button>
        </div>
      </div>

      <div className="w-full max-w-3xl mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
        <h2 className="text-lg font-semibold text-gray-300 mb-2">Analysis Result:</h2>
        <div className="whitespace-pre-wrap text-gray-200">
          {loading ? (
            <span className="text-gray-500">Processing your code...</span>
          ) : (
            <AnimateText
              text={analysisText}
              speed={2}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
