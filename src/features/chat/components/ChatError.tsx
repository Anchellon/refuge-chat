// src/components/chat/ChatError.tsx
interface ChatErrorProps {
  message: string;
}

export default function ChatError({ message }: ChatErrorProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
      <p className="text-sm text-red-800">
        <strong>Error:</strong> {message}
      </p>
    </div>
  );
}
