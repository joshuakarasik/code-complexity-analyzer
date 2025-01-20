import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";

function CodeEditor({ code, setCode }) {
  useEffect(() => {
    // Re-highlight on code change
    Prism.highlightAll();
  }, [code]);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="flex flex-col w-full bg-gray-900 text-white rounded-lg overflow-hidden border border-gray-700">
      {/* Editable Textarea Layer */}
      <textarea
        className="w-full bg-gray-900 text-gray-300 font-mono p-4 focus:outline-none 
                   focus:ring-2 focus:ring-gray-500 whitespace-pre overflow-auto text-left"
        style={{ direction: "ltr" }}
        spellCheck="false"
        aria-label="Raw code input"
        value={code}
        onChange={handleChange}
      />

      {/* Highlighted Code Layer */}
      <pre className="language-javascript w-full m-0 p-4 overflow-auto text-left">
        <code
          className="language-javascript"
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(code, Prism.languages.javascript, "javascript"),
          }}
        />
      </pre>
    </div>
  );
}

export default CodeEditor;
