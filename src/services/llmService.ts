// services/llmService.ts
// For types/interfaces only
import type {
  Message,
  ChatRequest,
  ChatResponse,
} from "@/features/chat/types/chat.types";

export async function sendChatMessage(
  message: string,
  history: Message[]
): Promise<ChatResponse> {
  const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history } as ChatRequest),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}
