// features/chat/types/chat.types.ts
export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  history: Message[];
}

export interface ChatResponse {
  content: string;
  error?: string;
}
