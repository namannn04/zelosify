"use client";
import { RotateCcw } from "lucide-react";
import MsgFromUser from "./MsgFromUser";
import MsgFromAI from "./MsgFromAI";
import useChat from "@/hooks/Dashboard/Chat/useChat";
import { useEffect, useRef, useState } from "react";
import CircleLoader from "@/components/UI/loaders/CircleLoader";

export default function ChatArea() {
  const [mounted, setMounted] = useState(false);
  const chatEndRef = useRef(null);

  const {
    messages = [],
    handleSendMessage = () => {},
    isLoading = false,
  } = useChat();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (chatEndRef.current && mounted) {
      console.log("Scrolling to the end of chat...");
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Chat end ref or mounted state is not ready.");
    }
  }, [messages, mounted]);

  const handleRegenerate = () => {
    if (!mounted) return;

    if (messages.length >= 2) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((msg) => msg.sender === "user");

      if (lastUserMessage && !isLoading) {
        handleSendMessage(lastUserMessage.content);
      }
    }
  };

  if (!mounted) {
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
          <p className="mb-2">No messages yet</p>
          <p>Type something to start a conversation</p>
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
