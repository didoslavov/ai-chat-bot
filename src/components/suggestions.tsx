"use client";

import React, { useEffect, useRef, useState } from "react";
import Message from "./ui/message";
import { Message as IMessage } from "ai/react";
import useLocalStorage from "@/hooks/use-local-storage";
import { fetchSuggestions } from "@/lib/fetch-suggestions";
import { useScrollBlur } from "@/hooks/use-scroll-blur";

function Suggestions({
  message,
  onSuggestionClick,
}: {
  message: IMessage[];
  onSuggestionClick: (s: string) => void;
}) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [isPrerendered, setIsPrerendered] = useState(false);
  const [suggestions, setSuggestions] = useLocalStorage<string[]>(
    "suggestions",
    [],
  );

  useScrollBlur(scrollContainer);

  //* This workround is to prevent the suggestions from being fetched multiple times when the message is streamed
  useEffect(() => {
    if (!isPrerendered) {
      fetchSuggestions(message).then((data) => {
        setSuggestions(data.suggestions[0].split(" | "));
        setIsPrerendered(true);
      });
    }
  }, [isPrerendered]); // eslint-disable-line react-hooks/exhaustive-deps -- only want to run when prerendered change

  useEffect(() => {
    setIsPrerendered(false);
  }, [message]);

  return (
    <div className="flex items-center gap-4">
      <p className="text-accent text-opacity-60">Suggestions:</p>
      <div
        ref={scrollContainer}
        className="flex gap-3 overflow-scroll hide-scrollbar blur-right"
      >
        {suggestions.map((s: string, i: number) => (
          <Message
            key={i}
            variant="user"
            className="text-nowrap"
            onClick={onSuggestionClick}
          >
            {s}
          </Message>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
