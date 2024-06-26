"use client";

import React, { forwardRef, ChangeEvent, FormEvent } from "react";
import Icon from "./ui/icon";
import { ChatRequestOptions } from "ai";

type Props = {
  className?: string;
  input: string;
  isRecording: boolean;
  handleInputChange: (e: ChangeEvent<any> | ChangeEvent<any>) => void;
  handleMicClick: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void; // Add closing parenthesis here
  chatRequestOptions?: ChatRequestOptions | undefined;
  openDropZone: () => void;
};

const ChatForm = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      input,
      isRecording,
      handleInputChange,
      handleSubmit,
      handleMicClick,
      openDropZone,
    },
    ref,
  ) => {
    return (
      <form className={`${className}`} onSubmit={handleSubmit}>
        <div className="flex items-center justify-between rounded-2xl bg-primary px-3">
          <input
            ref={ref}
            onChange={handleInputChange}
            value={input}
            type="text"
            placeholder="Ask for opportunities"
            className="h-full w-full bg-transparent py-3 outline-none"
          />
          {isRecording && (
            <div className="h-4 w-4 animate-pulse rounded-full bg-red-400" />
          )}
          <div className="flex w-fit items-center gap-1">
            <button type="submit">
              <Icon type="send" />
            </button>
            <button onClick={handleMicClick}>
              <Icon type="mic" />
            </button>
            <button onClick={openDropZone}>
              <Icon type="img" />
            </button>
          </div>
        </div>
      </form>
    );
  },
);

//* Set the displayName for the Container component, for easier debugging
ChatForm.displayName = "ChatForm";

export default ChatForm;
