"use client";

import React, { useEffect, useRef } from "react";
import Message from "./Message";

const suggestions = [
  { id: 1, text: "show the temperature in F" },
  { id: 2, text: "Give me 7-day prognosys" },
  { id: 3, text: "Give me 14-day prognosys" },
  { id: 4, text: "What is the wind speed?" },
  { id: 5, text: "What is the atmospheric pressure?" },
];

function Suggestions() {
  const scrollContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = scrollContainer.current;

      if (element) {
        if (element.scrollLeft > 0) {
          element.classList.remove("blur-right");
          element.classList.add("blur-left");
        } else {
          element.classList.remove("blur-left");
          element.classList.add("blur-right");
        }
      }
    };

    if (scrollContainer.current) {
      const currentScrollContainer = scrollContainer.current;
      currentScrollContainer.addEventListener("scroll", handleScroll);

      return () => {
        currentScrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="flex items-center gap-4">
      <p className="text-accent text-opacity-60">Suggestions:</p>
      <div
        ref={scrollContainer}
        className="hide-scrollbar blur-right flex gap-3 overflow-scroll"
      >
        {suggestions.map((s) => (
          <Message key={s.id} variant="user" className="text-nowrap">
            {s.text}
          </Message>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
