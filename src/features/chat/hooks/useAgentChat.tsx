import { useState, useRef, useCallback } from "react";
import { nanoid } from "nanoid";
import type { Message, ChatStatus } from "../types/chat.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function useAgentChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [toolStatus, setToolStatus] = useState<string | null>(null);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const conversationId = useRef<string>(nanoid());

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || status === "streaming") return;

      // Append user message immediately
      const userMessage: Message = {
        id: nanoid(),
        role: "user",
        content: text,
      };
      setMessages((prev) => [...prev, userMessage]);
      setStatus("streaming");
      setError(null);
      setToolStatus(null);

      // Placeholder for the assistant reply — filled in as tokens arrive
      const assistantId = nanoid();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      try {
        const response = await fetch(`${API_URL}/api/v1/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversation_id: conversationId.current,
            message: text,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          // Keep the last (possibly incomplete) line in the buffer
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.slice(6).trim();
            if (!raw) continue;

            let event: Record<string, unknown>;
            try {
              event = JSON.parse(raw);
            } catch {
              continue;
            }

            switch (event.type) {
              case "text-delta":
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: m.content + (event.delta as string) }
                      : m,
                  ),
                );
                break;

              case "tool-start":
                setToolStatus(event.status as string);
                break;

              case "tool-end":
                setToolStatus(null);
                break;

              case "finish":
                setStatus("idle");
                setToolStatus(null);
                break;

              case "error":
                throw new Error(event.errorText as string);
            }
          }
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
        setStatus("error");
        setToolStatus(null);
        // Remove the empty assistant placeholder on error
        setMessages((prev) =>
          prev.filter((m) => !(m.id === assistantId && m.content === "")),
        );
      }
    },
    [status],
  );

  return { messages, toolStatus, status, error, sendMessage };
}
