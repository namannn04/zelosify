import { useEffect } from "react";
import useChat from "@/hooks/Dashboard/Chat/useChat";
import InputArea from "./InputArea";
import ChatArea from "./ChatArea";
import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";

export default function ChatLayout() {
  const { handleCreateNewChat } = useChat();

  useEffect(() => {
    // Initialize a new chat locally when the page loads
    handleCreateNewChat();
  }, [handleCreateNewChat]);

  return (
    <div className="px-2 flex flex-row">
      <div className="bg-background flex flex-col basis-full h-[calc(100vh-4rem)]">
        {/* Header */}
        <ChatHeader />

        {/* Chat Area */}
        <ChatArea />

        {/* Input Area */}
        <InputArea />
      </div>
      <div className="basis-1/6 border-l border-border">
        <ChatHistory />
      </div>
    </div>
  );
}
