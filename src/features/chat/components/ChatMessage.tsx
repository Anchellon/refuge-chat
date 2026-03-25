import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isStreaming?: boolean;
}

export default function ChatMessage({
  content,
  isUser,
  isStreaming,
}: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      <div
        className={`max-w-2xl px-4 py-3 rounded-lg ${
          isUser ? "bg-blue-500 text-white" : "bg-white border shadow-sm"
        }`}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        ) : content ? (
          <div className="text-sm prose prose-sm max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <span className="text-sm text-gray-400 italic">
            {isStreaming ? "Thinking..." : ""}
          </span>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-1">
          <User className="w-5 h-5 text-gray-600" />
        </div>
      )}
    </div>
  );
}
