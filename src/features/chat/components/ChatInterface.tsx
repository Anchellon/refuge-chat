// src/components/ChatInterface.tsx
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useState } from "react";
import Header from "@/shared/components/layouts/Header/Header";
import ChatMessagesList from "./ChatMessagesList";
import ChatInput from "./ChatInput";
import type { ChatMessage } from "../types/chat.types";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ChatInterface() {
  const [input, setInput] = useState("");
  console.log(API_URL);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: `${API_URL}/api/chat`,
    }),
    onFinish: (message) => {
      console.log("✅ Message finished:", message);
    },
    onError: (error) => {
      console.error("❌ Error:", error);
    },
  });

  // Debug logging
  useEffect(() => {
    console.log("📨 Messages updated:", messages.length);
    console.log("🔄 Status:", status);
  }, [messages, status]);

  const handleSubmit = () => {
    console.log("🚀 Sending message:", input);
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <ChatMessagesList
        messages={messages as ChatMessage[]}
        status={status}
        error={error}
      />

      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        disabled={status !== "ready"}
      />
    </div>
  );
}
