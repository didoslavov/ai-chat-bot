import { BlobToBase64Callback } from "@/types/blob-to-base64-type";
import { blobToBase64 } from "@/utils/blob-to-base64";
import { useEffect, useState, useRef } from "react";

export const useRecordVoice = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [text, setText] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);

  const chunks = useRef([]);

  const startRecording = () => {
    if (mediaRecorder) {
      (mediaRecorder as MediaRecorder).start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      (mediaRecorder as MediaRecorder).stop();
      setIsRecording(false);
    }
  };

  const getTextFromAudio = (base64data: string | null) => {
    if (base64data) {
      setText(base64data);
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
      blobToBase64(
        audioBlob,
        getTextFromAudio as unknown as BlobToBase64Callback,
      );
    };

    setMediaRecorder(mediaRecorder as MediaRecorder | null);
  };

  const handleClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (!isRecording) {
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

  return { recording: isRecording, handleClick, text };
};
