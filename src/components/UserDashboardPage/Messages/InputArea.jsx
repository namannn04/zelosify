"use client";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

export default function InputArea({ isLoading, handleSendMessage }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  // Reset textarea height to auto
  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // Send message and reset form
  const sendMessageWrapper = () => {
    if (message.trim() && !isLoading) {
      handleSendMessage(message.trim());
      setMessage("");
      resetTextareaHeight();
    }
  };

  // Auto-resize textarea on input
  const handleChange = (e) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      resetTextareaHeight();
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Handle Enter key (without Shift) to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageWrapper();
    }
  };

  return (
    <div className="border-t border-border rounded-b-lg p-3 text-sm bg-background">
      <div className="relative flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Send a message"
          rows={1}
          disabled={isLoading}
          className="border border-border w-full px-12 py-3 rounded-lg bg-tableHeader focus:outline-none focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-600 resize-none overflow-y-auto min-h-[50px] max-h-[200px]"
        />

        <div className="absolute right-3 flex items-center">
          <div className="group relative">
            <button
              onClick={sendMessageWrapper}
              disabled={isLoading || !message.trim()}
              className="p-1 rounded-full bg-foreground text-background hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
            {!isLoading && (
              <span className="w-[105px] absolute -top-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
                Send Message
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
