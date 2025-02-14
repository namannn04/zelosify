import { RotateCcw } from "lucide-react";
import MsgFromUser from "./MsgFromUser";
import MsgFromAI from "./MsgFromAI";

export default function ChatArea() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6 text-sm bg-white dark:bg-gray-900 dark:text-white">
      {/* 1st User Message */}
      <MsgFromUser />

      {/* 1st AI Message */}
      <MsgFromAI />

      {/* 2nd User Message */}
      <MsgFromUser />

      {/* 2nd AI Message */}
      <MsgFromAI />

      {/* Regenerate Button */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">
          <RotateCcw className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          Regenerate
        </button>
      </div>
    </div>
  );
}
