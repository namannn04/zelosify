import { Plus, Settings, Trash } from "lucide-react";
import React from "react";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b text-sm">
      <h2 className="text-xl font-semibold">Zelosify AI Chat</h2>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Trash className="w-5 h-5 text-gray-600" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800">
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>
    </div>
  );
}
