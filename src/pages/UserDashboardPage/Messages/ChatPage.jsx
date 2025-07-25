"use client";

import CircleLoader from "@/components/UI/loaders/CircleLoader";
import ChatLayout from "@/components/UserDashboardPage/Messages/ChatLayout";
import { useEffect, useState } from "react";
import useChat from "@/hooks/Dashboard/Chat/useChat";

// Separate component to handle the chat content after mounting
function ChatContent() {
  const { handleCreateNewChat, activeConversationId } = useChat();

  // Create a new conversation on initial page load if there isn't one
  useEffect(() => {
    if (!activeConversationId) {
      handleCreateNewChat();
    }
  }, [activeConversationId, handleCreateNewChat]);

  return <ChatLayout />;
}

export default function ChatPage() {
  // Safely track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render a placeholder during SSR and initial mount
  if (!isMounted) {
    return (
      <div className="w-full flex items-center justify-center min-h-[70vh]">
        <CircleLoader />
      </div>
    );
  }

  // Only render the chat content on the client
  return (
    <div className="w-full">
      <ChatContent />
    </div>
  );
}
