"use client";

import ChatForm from "@/components/chat-form";
import Suggestions from "./suggestions";
import { Message as IMessage, useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import TypingIndicator from "./ui/typing-indicator";
import { useRecordVoice } from "@/hooks/use-record-voice";
import Container from "./ui/container";
import Message from "./ui/message";

const defaultMessages: IMessage[] = [
  {
    id: Date.now().toString(),
    role: "assistant",
    content: "Hey there, my name is Chatty!",
  },
  {
    id: (Date.now() + 1000).toString(),
    role: "assistant",
    content: "How may I help you today?",
  },
];

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { handleClick, text, isRecording } = useRecordVoice();
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
    api: "/api/assistant/reply",
    initialMessages: localMessages.length ? localMessages : defaultMessages,
  });

  const handleMicClick = () => handleClick(inputRef);
  const onSuggestionClick = (s: string) => {
    setInput(s);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (text) {
      setInput(text);
    }
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps -- only want to run when text changes

  useEffect(() => {
    setLocalMessages(messages);

    if (chatBoxRef.current === null) {
      return;
    }

    chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps -- only want to run when messages change

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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
            isRecording={isRecording}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            handleMicClick={handleMicClick}
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
