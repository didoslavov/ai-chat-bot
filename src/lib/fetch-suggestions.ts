import { Message } from "ai/react";

export const fetchSuggestions = async (message: Message[]) => {
  const messages: Message[] = [
    {
      id: Date.now().toString(),
      role: "assistant",
      content:
        message[message.length - 1]?.content.split("\n").join("") ||
        "How to start a conversation?",
    },
    {
      id: (Date.now() + 1000).toString(),
      role: "user",
      content:
        "Give my 10 message suggestions based on your previous answer from the user perspective. Keep them short and simple, not a list, no additinal greeting message, just plain text messages with max 10 words and split them with |",
    },
  ];
  try {
    const response = await fetch("/api/assistant/suggestions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch suggestions");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
