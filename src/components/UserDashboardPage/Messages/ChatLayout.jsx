import { useEffect } from "react";
import useChat from "@/hooks/Dashboard/Chat/useChat";
import InputArea from "./InputArea";
import ChatArea from "./ChatArea";
import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";

export default function ChatLayout() {
  const {
    handleCreateNewChat,
    isLoading,
    handleSendMessage,
    messages,
    conversations,
    activeConversationId,
    handleSwitchConversation,
  } = useChat();

  // Initialize new chat on component mount
  useEffect(() => {
    handleCreateNewChat();
  }, [handleCreateNewChat]);

  return (
    <div className="px-2 flex flex-row">
      <div className="bg-background flex flex-col basis-full h-[calc(100vh-4rem)]">
        {/* Header */}
        <ChatHeader
          isLoading={isLoading}
          handleCreateNewChat={handleCreateNewChat}
        />

        {/* Chat Area */}
        <ChatArea
          isLoading={isLoading}
          messages={messages}
          handleSendMessage={handleSendMessage}
        />

        {/* Input Area */}
        <InputArea
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
        />
      </div>
      <div className="basis-1/6 border-l border-border">
        {/* Chat History */}
        <ChatHistory
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSwitchConversation}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
