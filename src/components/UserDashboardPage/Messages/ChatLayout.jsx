import InputArea from "./InputArea";
import ChatArea from "./ChatArea";
import ChatHeader from "./ChatHeader";

export default function ChatLayout() {
  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <ChatHeader />

      {/* Chat Area */}
      <ChatArea />

      {/* Input Area */}
      <InputArea />
    </div>
  );
}
