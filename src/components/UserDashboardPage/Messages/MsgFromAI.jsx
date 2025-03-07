import React from "react";
import InteractionTools from "./InteractionTools";

export default function MsgFromAI() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-[url('/favicon.ico')] dark:bg-[url('/favicon1.ico')] bg-cover bg-center flex-shrink-0"></div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="flex-center font-medium text-base">Zelosify AI</span>
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            Just now
          </span>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Here's the results of 5 attention-grabbing headlines:
          </p>

          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400">1</span>
              <p className="text-gray-900 dark:text-white">
                "Revolutionize Customer Engagement with AI Chat Copywriter"
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400">2</span>
              <p className="text-gray-900 dark:text-white">
                "Unleash the Power of AI Chat Copywriters for Transformative
                Customer Experiences"
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400">3</span>
              <p className="text-gray-900 dark:text-white">
                "Chatbots on Steroids: Meet the AI Copywriter Transforming
                Conversations"
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400">4</span>
              <p className="text-gray-900 dark:text-white">
                "From Bland to Brilliant: AI Chat Copywriters Make Brands
                Conversational Rockstars"
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400">5</span>
              <p className="text-gray-900 dark:text-white">
                "Say Goodbye to Boring Chats: AI Copywriters Elevate
                Conversational Marketing"
              </p>
            </div>
          </div>

          {/* Interactions */}
          <InteractionTools />
        </div>
      </div>
    </div>
  );
}
