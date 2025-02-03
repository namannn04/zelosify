import { Maximize, Plus, Settings, Trash } from "lucide-react";
import React from "react";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b text-sm">
      <h2 className="text-xl font-bold">Zelosify AI Chat</h2>
      <div className="flex items-center gap-2">
        <div className="group relative">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Maximize className="w-5 h-5 text-gray-600" />
          </button>
          <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
            Maximize
          </span>
        </div>

        <div className="group relative">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
            Settings
          </span>
        </div>

        <div className="group relative">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Trash className="w-5 h-5 text-gray-600" />
          </button>
          <span className="w-[90px] absolute -bottom-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
            Delete Chat
          </span>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800">
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>
    </div>
  );
}
