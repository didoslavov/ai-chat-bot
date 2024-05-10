export const fetchTranscription = async (base64data: string) => {
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

    return text;
  } catch (error) {
    console.log(error);
    return "";
  }
};
