"use client";
import { Maximize, Plus, Settings, Trash } from "lucide-react";
import { useChat } from "@/contexts/Chat/ChatContext";

export default function ChatHeader() {
  const { createNewChat, isLoading } = useChat();

  const handleNewChat = async () => {
    if (!isLoading) {
      try {
        // await createNewChat();
      } catch (error) {
        console.error("Error creating new chat:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-border rounded-t-lg text-sm">
      <h2 className="text-2xl font-bold">Zelosify AI Chat</h2>
      <div className="flex items-center gap-2">
        <div className="group relative">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Maximize className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
            Maximize
          </span>
        </div>

        <div className="group relative">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
            Settings
          </span>
        </div>

        <div className="group relative">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Trash className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="w-[90px] absolute -bottom-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
            Delete Chat
          </span>
        </div>

        <button
          onClick={handleNewChat}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-border border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Plus className="w-4 h-4" />
          )}
          New Chat
        </button>
      </div>
    </div>
  );
}
