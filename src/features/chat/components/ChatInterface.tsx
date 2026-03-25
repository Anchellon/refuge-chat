import { useState } from "react";
import Header from "@/shared/components/layouts/Header/Header";
import ChatMessagesList from "./ChatMessagesList";
import ChatInput from "./ChatInput";
import { useAgentChat } from "../hooks/useAgentChat";

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const { messages, toolStatus, status, error, sendMessage } = useAgentChat();

  const handleSubmit = () => {
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <ChatMessagesList
        messages={messages}
        toolStatus={toolStatus}
        status={status}
        error={error}
      />
      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        disabled={status === "streaming"}
      />
    </div>
  );
}
