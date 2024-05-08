import ChatForm from "@/components/ChatForm";
import Container from "@/components/Container";
import Message from "@/components/Message";
import Suggestions from "@/components/Suggestions";
import TypingIndicator from "@/components/TypingIndicator";

export default function Home() {
  return (
    <>
      <Container className="min-h-[624px]">
        <section className="flex flex-col gap-5">
          <Message variant="bot">Hey there, my name is Chatty!</Message>
          <Message variant="bot">How may I help you today?</Message>
          <Message variant="user">
            Hey I want to know what the wheater is in Brussels?
          </Message>
          <TypingIndicator />
        </section>
      </Container>
      <div className="border-t-2 border-primary">
        <Container className="pt-4">
          <ChatForm className="mb-3" />
          <Suggestions />
        </Container>
      </div>
    </>
  );
}
