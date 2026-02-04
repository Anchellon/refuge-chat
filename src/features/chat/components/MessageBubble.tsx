// features/chat/components/MessageBubble.tsx
import type { Message } from "../types/chat.types";
import { Bot, User } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={`flex gap-3 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.role === "assistant" && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
      )}

      <Card
        className={`max-w-2xl px-4 py-3 ${
          message.role === "user" ? "bg-primary text-primary-foreground" : ""
        }`}
      >
        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
      </Card>

      {message.role === "user" && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
