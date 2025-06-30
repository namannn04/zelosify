"use client";
import { RotateCcw } from "lucide-react";
import MsgFromUser from "./MsgFromUser";
import MsgFromAI from "./MsgFromAI";
import { useEffect, useRef, useState } from "react";
import CircleLoader from "@/components/UI/loaders/CircleLoader";

export default function ChatArea({
  isLoading = false,
  messages = [],
  handleSendMessage = () => {},
}) {
  const [mounted, setMounted] = useState(false);
  const chatEndRef = useRef(null);
  const initialScrollDone = useRef(false);

  // Ensure component is mounted before scrolling
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (!mounted || initialScrollDone.current) return;

    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      initialScrollDone.current = true;
    }
  }, [messages, mounted]);

  // Regenerate last user message
  const handleRegenerate = () => {
    if (!mounted) return;

    const lastUserMessage = messages.findLast((msg) => msg.sender === "user");
    if (lastUserMessage && !isLoading) {
      handleSendMessage(lastUserMessage.content);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
        <CircleLoader />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <p className="mb-2">New chat, start a conversation</p>
          <p>Type something to begin</p>
        </div>
      ) : (
        <>
          {messages.map((message) =>
            message.sender === "user" ? (
              <MsgFromUser
                key={message.id}
                message={message.content}
                timestamp={message.timestamp}
              />
            ) : (
              <MsgFromAI
                key={message.id}
                message={message.content}
                timestamp={message.timestamp}
                isError={message.isError}
              />
            )
          )}

          {/* Show regenerate button after at least one AI response */}
          {messages.some((m) => m.sender === "ai") && (
            <div className="flex justify-center">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-tableHeader text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                onClick={handleRegenerate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <RotateCcw className="h-4 w-4 text-foreground" />
                )}
                Regenerate response
              </button>
            </div>
          )}
        </>
      )}
      <div ref={chatEndRef} />
    </div>
  );
}
