import { useCallback, useState } from "react";
import { convertToBase64 } from "@/utils/file-to-base64";
import { Message } from "ai";
import { DropEvent, FileRejection } from "react-dropzone";

export const useOnDrop = (messages: Message[], setMessages: Function) => {
  const [isLoadingShow, setIsLoadingShow] = useState(false);

  const onDrop = useCallback(
    async (
      acceptedFiles: File[],
      _fileRejections: FileRejection[],
      _event: DropEvent,
    ) => {
      const file = acceptedFiles[0];

      if (!file) {
        return;
      }

      setIsLoadingShow(true);

      const base64Data = await convertToBase64(file);
      const base64Image = `data:image/jpeg;base64,${base64Data?.toString().split(",")[1]}`;

      await fetch("/api/assistant/image-transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      }).then(async (res: any) => {
        const reader = res.body?.getReader();
        let isDone = false;
        let fullMessage = "";
        while (!isDone) {
          const { done, value } = await reader?.read();

          if (done) {
            isDone = true;
            break;
          }

          const chunk = new TextDecoder("utf-8").decode(value);
          const cleanedChunk = chunk.replace(/0|:|"|\n|\\/g, "");

          fullMessage += cleanedChunk;
        }

        const newMessages = [
          ...messages,
          {
            id: (Date.now() + 1000).toString(),
            role: "assistant" as const,
            content: fullMessage,
          },
        ];

        setIsLoadingShow(false);
        setMessages(newMessages);
      });
    },
    [messages, setMessages],
  );

  return { onDrop, isLoadingShow };
};
