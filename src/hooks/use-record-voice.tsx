import { BlobToBase64Callback } from "@/types/blob-to-base64-type";
import { blobToBase64 } from "@/utils/blob-to-base64";
import { useEffect, useState, useRef } from "react";

export const useRecordVoice = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [text, setText] = useState<string>("");

  const [recording, setRecording] = useState(false);

  const chunks = useRef([]);

  const startRecording = () => {
    if (mediaRecorder) {
      (mediaRecorder as MediaRecorder).start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      (mediaRecorder as MediaRecorder).stop();
      setRecording(false);
    }
  };

  const getText = async (base64data: BlobToBase64Callback) => {
    try {
      const response = await fetch("/api/assistant/speech-to-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio: base64data,
        }),
      }).then((res) => res.json());
      const { text } = response;

      setText(text);
    } catch (error) {
      console.log(error);
    }
  };

  const initialMediaRecorder = (stream: MediaStream) => {
    const mediaRecorder: MediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      chunks.current = [];
    };

    mediaRecorder.ondataavailable = (ev: BlobEvent) => {
      chunks.current.push(ev.data as never);
    };

    mediaRecorder.onstop = () => {
      const audioBlob: Blob = new Blob(chunks.current, { type: "audio/wav" });
      blobToBase64(audioBlob, getText as unknown as BlobToBase64Callback); // Change the type of getText to unknown first
    };

    setMediaRecorder(mediaRecorder as MediaRecorder | null);
  };

  const handleClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- run only once on mount to get the media stream

  return { recording, handleClick, text };
};
