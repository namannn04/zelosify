import InputArea from "./InputArea";
import ChatArea from "./ChatArea";
import ChatHeader from "./ChatHeader";

export default function ChatLayout() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border dark:border-gray-700 dark:shadow-md flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <ChatHeader />

      {/* Chat Area */}
      <ChatArea />

      {/* Input Area */}
      <InputArea />
    </div>
  );
}
