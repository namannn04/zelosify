import React from "react";
import ProfileImage from "../../UI/ProfileImage";

export default function MsgFromUser() {
  return (
    <div className="flex gap-3">
      <ProfileImage className="w-8 h-8" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-base">John Doe</span>
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            Just now
          </span>
        </div>
        <div className="inline-block max-w-[70%] bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <p className="text-gray-900 dark:text-white">
            Generate 5 attention-grabbing headlines for an article about AI Chat
            Copywriter
          </p>
        </div>
      </div>
    </div>
  );
}
