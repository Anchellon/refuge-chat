// src/components/chat/ChatMessagesList.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatEmptyState from "./ChatEmptyState";
import ChatError from "./ChatError";
import type {
  ChatMessage as ChatMessageType,
  MessagePart,
} from "../types/chat.types";

interface ChatMessagesListProps {
  messages: ChatMessageType[];
  status: string;
  error?: Error | null;
}

export default function ChatMessagesList({
  messages,
  status,
  error,
}: ChatMessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Type guard for text parts
  const isTextPart = (
    part: MessagePart,
  ): part is { type: "text"; text: string } => {
    return part.type === "text";
  };

  // Helper to extract text from message parts
  const getMessageText = (msg: ChatMessageType): string => {
    if (!msg.parts || !Array.isArray(msg.parts)) {
      return "";
    }

    return msg.parts
      .filter(isTextPart)
      .map((p) => p.text)
      .join("");
  };

  return (
    <ScrollArea className="flex-1 px-4">
      <div className="max-w-3xl mx-auto py-6 space-y-4">
        {/* Empty State */}
        {messages.length === 0 && <ChatEmptyState />}

        {/* Message List */}
        {messages.map((msg) => {
          const text = getMessageText(msg);
          const isUser = msg.role === "user";

          return (
            <ChatMessage
              key={msg.id}
              text={text}
              isUser={isUser}
              status={status}
            />
          );
        })}

        {/* Error Display */}
        {error && <ChatError message={error.message} />}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
