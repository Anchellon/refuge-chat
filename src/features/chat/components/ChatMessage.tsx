// src/components/chat/ChatMessage.tsx
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  status?: string;
}

export default function ChatMessage({
  text,
  isUser,
  status,
}: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-2xl px-4 py-3 rounded-lg ${
          isUser ? "bg-blue-500 text-white" : "bg-white border shadow-sm"
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
}
