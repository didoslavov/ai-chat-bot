"use client";

import React, { forwardRef, ChangeEvent, FormEvent } from "react";
import Icon from "./ui/icon";
import { ChatRequestOptions } from "ai";

const buttons = [
  { id: Date.now().toString(), type: "send" },
  { id: (Date.now() + 1000).toString(), type: "mic" },
  { id: (Date.now() + 2000).toString(), type: "img" },
];

type Props = {
  input: string;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void;
  handleInputChange: (e: ChangeEvent<any> | ChangeEvent<any>) => void;
  className?: string;
  handleMicClick: () => void;
};

const ChatForm = forwardRef<HTMLInputElement, Props>(
  (
    { input, handleSubmit, handleInputChange, className, handleMicClick },
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
          <div className="flex w-fit items-center gap-1">
            <button type="submit">
              <Icon type="send" />
            </button>
            <button onClick={handleMicClick}>
              <Icon type="mic" />
            </button>
            <button>
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
