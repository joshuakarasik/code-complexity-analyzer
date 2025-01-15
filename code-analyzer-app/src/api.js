export const analyzeCode = async (code) => {
  try {
    const response = await fetch("http://localhost:5001/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }), // Sending the code to the backend
    });

    // Parse the response
    const data = await response.json();
    return data.analysis; // Return the analysis result
  } catch (error) {
    console.error("Error:", error.message);
    return "There was an error analyzing your code.";
  }
};
