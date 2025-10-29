import { useState, useEffect } from "react";

// Define the steps the AI will cycle through.
const loadingSteps = [
  "AI has received your emails...",
  "AI is reading your emails...",
  "AI is analyzing your content...",
  "AI is preparing your results...",
  "AI is classifying your emails!",
];

const AIEmailClassifyingNotifier = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStepIndex((prevIndex) => (prevIndex + 1) % loadingSteps.length);
    }, 2200);

    return () => clearTimeout(timer);
  }, [currentStepIndex]);
  return (
    <div className="border-2 rounded-sm px-3 py-1 font-bold">
      <span className="inline-spinner"></span>{" "}
      <span className="ml-2">{loadingSteps[currentStepIndex]}</span>
    </div>
  );
};

export default AIEmailClassifyingNotifier;
