import { convertToBase64 } from "@/utils/file-to-base64";
import { useCallback } from "react";

type UseImageUploadOptions = {
  onUpload: (base64Image: string, fileType: string) => void;
};

export function useImageUpload({ onUpload }: UseImageUploadOptions) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) {
        return;
      }

      const base64Data = await convertToBase64(file);
      const base64Image = base64Data?.toString().split(",")[1];

      if (base64Image) {
        onUpload(base64Image, file.type);
      }
    },
    [onUpload],
  );

  return { onDrop };
}
