import InputArea from "./InputArea";
import ChatArea from "./ChatArea";
import ChatHeader from "./ChatHeader";

export default function ChatLayout() {
  return (
    <div className="bg-background px-2 flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <ChatHeader />

      {/* Chat Area */}
      <ChatArea />

      {/* Input Area */}
      <InputArea />
    </div>
  );
}
