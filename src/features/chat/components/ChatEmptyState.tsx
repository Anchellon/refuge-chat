// src/components/chat/ChatEmptyState.tsx
import { Bot } from "lucide-react";

interface ChatEmptyStateProps {
  title?: string;
  description?: string;
}

export default function ChatEmptyState({
  title = "Start a conversation",
  description = "Ask me anything about your database",
}: ChatEmptyStateProps) {
  return (
    <div className="text-center py-12">
      <Bot className="w-12 h-12 text-blue-500 mx-auto mb-4" />
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
