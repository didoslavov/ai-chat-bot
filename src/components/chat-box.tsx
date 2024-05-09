"use client";

import ChatForm from "@/components/chat-form";
import Container from "@/components/container";
import Message from "@/components/message";
import Suggestions from "./suggestions";
import { Message as IMessage, useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import TypingIndicator from "./typing-indicator";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [localMessages, setLocalMessages] = useLocalStorage<IMessage[]>(
    "chatMessages",
    [],
  );

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    api: "/api/assistant/messages",
    initialMessages: localMessages,
  });

  const onSuggestionClick = (s: string) => {
    setInput(s);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    setLocalMessages(messages);

    if (chatBoxRef.current === null) {
      return;
    }

    chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps -- only want to run when messages change

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Container
        ref={chatBoxRef}
        className="h-[624px] overflow-y-auto overflow-x-hidden"
      >
        <section className="flex flex-col gap-5 ">
          {messages.map((message) => (
            <Message key={message.id} variant={message.role}>
              {message.content}
            </Message>
          ))}
          {isLoading && <TypingIndicator />}
        </section>
      </Container>
      <div className="border-t-2 border-primary">
        <Container className="pt-4">
          <ChatForm
            ref={inputRef}
            className="mb-3"
            input={input}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
          <Suggestions
            message={messages}
            onSuggestionClick={onSuggestionClick}
          />
        </Container>
      </div>
    </>
  );
}
