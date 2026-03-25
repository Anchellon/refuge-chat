import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatEmptyState from "./ChatEmptyState";
import ChatError from "./ChatError";
import type { Message, ChatStatus } from "../types/chat.types";

interface ChatMessagesListProps {
  messages: Message[];
  toolStatus: string | null;
  status: ChatStatus;
  error: string | null;
}

export default function ChatMessagesList({
  messages,
  toolStatus,
  status,
  error,
}: ChatMessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, toolStatus]);

  const isStreaming = status === "streaming";
  const lastMessage = messages[messages.length - 1];

  return (
    <ScrollArea className="flex-1 px-4">
      <div className="max-w-3xl mx-auto py-6 space-y-4">
        {messages.length === 0 && <ChatEmptyState />}

        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            content={msg.content}
            isUser={msg.role === "user"}
            isStreaming={isStreaming && msg.id === lastMessage?.id}
          />
        ))}

        {/* Tool status indicator — visible while the agent is mid-tool-call */}
        {toolStatus && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 flex-shrink-0" />
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg">
              <span className="text-sm text-blue-600">{toolStatus}</span>
              <span className="flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1 h-1 rounded-full bg-blue-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}

        {error && <ChatError message={error} />}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
