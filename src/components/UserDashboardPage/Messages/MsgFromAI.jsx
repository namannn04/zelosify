import React from "react";
import InteractionTools from "./InteractionTools";

export default function MsgFromAI() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-[url('/favicon.ico')] bg-cover bg-center flex-shrink-0"></div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="flex-center font-medium text-base">Zelosify AI</span>
          <span className="text-gray-500 text-xs">Just now</span>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-gray-700 mb-2">
            Here's the results of 5 attention-grabbing headlines:
          </p>

          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="text-gray-500">1</span>
              <p className="text-gray-900">
                "Revolutionize Customer Engagement with AI Chat Copywriter"
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">2</span>
              <p className="text-gray-900">
                "Unleash the Power of AI Chat Copywriters for Transformative
                Customer Experiences"
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">3</span>
              <p className="text-gray-900">
                "Chatbots on Steroids: Meet the AI Copywriter Transforming
                Conversations"
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">4</span>
              <p className="text-gray-900">
                "From Bland to Brilliant: AI Chat Copywriters Make Brands
                Conversational Rockstars"
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">5</span>
              <p className="text-gray-900">
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
