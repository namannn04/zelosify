import React from "react";
import ProfileImage from "../../UI/ProfileImage";
import useAuth from "@/hooks/auth/useAuth";
import { formatDistanceToNow } from "date-fns";

export default function MsgFromUser({ message, timestamp }) {
  const { user } = useAuth();
  // Format the timestamp
  const formattedTime = timestamp
    ? formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    : "Just now";

  return (
    <div className="flex gap-3">
      <ProfileImage className="w-8 h-8" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-base">{user?.name || "You"}</span>
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            {formattedTime}
          </span>
        </div>
        <div className="inline-block max-w-[70%] bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
