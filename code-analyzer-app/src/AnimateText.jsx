import React, { useState, useEffect } from "react";

/**
 * A simple typing animation that types out `text`
 * character by character with a given `speed` in ms.
 */
function AnimateText({ text = "", speed = 5 }) {
  const [animated, setAnimated] = useState(""); // Current typed substring
  const [index, setIndex] = useState(0); // Which character are we on?

  useEffect(() => {
    // Whenever `text` changes, reset our states so we start typing from scratch
    setAnimated("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    // If we still have characters left, schedule the next character
    if (index < text.length) {
      const timeout = setTimeout(() => {
        // Add the next character
        setAnimated((prev) => prev + text[index]);
        // Move on to the next character
        setIndex((prev) => prev + 1);
      }, speed);

      // Clear the timeout if the component unmounts or re-renders
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <div>{animated}</div>;
}

export default AnimateText;
