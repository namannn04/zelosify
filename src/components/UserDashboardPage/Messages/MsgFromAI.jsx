"use client";
import React from "react";
import InteractionTools from "./InteractionTools";
import { formatDistanceToNow } from "date-fns";

export default function MsgFromAI({ message, timestamp, isError }) {
  // Format the timestamp
  const formattedTime = timestamp
    ? formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    : "Just now";

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-[url('/favicon.ico')] dark:bg-[url('/favicon1.ico')] bg-cover bg-center flex-shrink-0"></div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="flex-center font-medium text-base">Zelosify AI</span>
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            {formattedTime}
          </span>
        </div>
        <div
          className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-4 ${
            isError ? "border-red-300 dark:border-red-700 border" : ""
          }`}
        >
          {isError ? (
            <p className="text-red-500 dark:text-red-400 whitespace-pre-wrap">
              {message}
            </p>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {message}
            </p>
          )}

          {/* Interactions */}
          <InteractionTools />
        </div>
      </div>
    </div>
  );
}
