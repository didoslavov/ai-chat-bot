import React from "react";

function TypingIndicator() {
  return (
    <div className="flex w-fit space-x-2 rounded-2xl bg-primary px-3 py-5">
      <div className="animate-pulse1 h-2 w-2 rounded-full bg-accent"></div>
      <div className="animate-pulse2 h-2 w-2 rounded-full bg-accent"></div>
      <div className="animate-pulse3 h-2 w-2 rounded-full bg-accent"></div>
    </div>
  );
}

export default TypingIndicator;
