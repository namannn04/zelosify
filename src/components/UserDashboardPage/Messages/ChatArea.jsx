import { RotateCcw } from "lucide-react";
import MsgFromUser from "./MsgFromUser";
import MsgFromAI from "./MsgFromAI";

export default function ChatArea() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
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
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-tableHeader text-sm">
          <RotateCcw className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          Regenerate
        </button>
      </div>
    </div>
  );
}
