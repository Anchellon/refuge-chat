import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import type { ChatMessage, MessagePart } from "../types/chat.types";

export default function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:3000/api/chat",
    }),
    onFinish: (message) => {
      console.log("✅ Message finished:", message);
    },
    onError: (error) => {
      console.error("❌ Error:", error);
    },
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Debug logging
  useEffect(() => {
    console.log("📨 Messages updated:", messages.length);
    console.log("🔄 Status:", status);
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status === "ready") {
      console.log("🚀 Sending message:", input);
      sendMessage({ text: input });
      setInput("");
    }
  };

  // Type guard for text parts
  const isTextPart = (
    part: MessagePart,
  ): part is { type: "text"; text: string } => {
    return part.type === "text";
  };

  // Helper to extract text from message parts
  const getMessageText = (msg: ChatMessage): string => {
    if (!msg.parts || !Array.isArray(msg.parts)) {
      return "";
    }

    return msg.parts
      .filter(isTextPart)
      .map((p) => p.text)
      .join("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-semibold">Database Chat Assistant</h1>
        <p className="text-sm text-gray-500">
          Ask questions about your database
        </p>
        <div className="text-xs text-gray-400 mt-2">
          Status: <span className="font-mono">{status}</span> | Messages:{" "}
          {messages.length}
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4">
        <div className="max-w-3xl mx-auto py-6 space-y-4">
          {/* Empty State */}
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Bot className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-lg font-medium mb-2">Start a conversation</h2>
              <p className="text-gray-500">
                Ask me anything about your database
              </p>
            </div>
          )}

          {/* Message List */}
          {messages.map((msg) => {
            const text = getMessageText(msg as ChatMessage);
            const isUser = msg.role === "user";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {/* Assistant Avatar */}
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-2xl px-4 py-3 rounded-lg ${
                    isUser
                      ? "bg-blue-500 text-white"
                      : "bg-white border shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {text || (
                      <span className="text-gray-400 italic">
                        {status === "streaming" ? "Thinking..." : "Loading..."}
                      </span>
                    )}
                  </p>
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-sm text-red-800">
                <strong>Error:</strong> {error.message}
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-white px-4 py-4 shadow-sm">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={status !== "ready"}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={status !== "ready" || !input.trim()}
            size="icon"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
