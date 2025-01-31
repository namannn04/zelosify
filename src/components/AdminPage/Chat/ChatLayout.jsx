import {
  Share2,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Mic,
  FileSearch,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export default function ChatLayout() {
  return (
    <div className="w-full max-w-[1000px] bg-white rounded-lg shadow-sm flex flex-col min-h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Zelosify AI Chat</h2>
        <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center font-medium mr-2">
          JD
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* User Message */}
        <div className="flex justify-end mb-4">
          <div className="bg-blue-100 rounded-lg p-3 max-w-[70%]">
            <p className="text-gray-900 font-medium">
              Generate 5 attention-grabbing headlines for an article about AI
              Chat Copywriter
            </p>
          </div>
        </div>

        {/* AI Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[url('/favicon.ico')] bg-cover bg-center flex-shrink-0"></div>
          <div className="flex-1">
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

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ThumbsUp className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ThumbsDown className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-gray-500 text-sm hover:bg-gray-100 px-2 py-1 rounded">
                  <span>Copy</span>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Share2 className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regenerate Button */}
        <div className="flex justify-center my-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 text-sm">
            <RotateCcw className="h-4 w-4" />
            Regenerate
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Send a message"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
          <div className="absolute left-0 bottom-[-40px] flex items-center gap-4 text-sm text-gray-600">
            <button className="flex items-center gap-1">
              <Paperclip className="w-4 h-4" />
              <span>Attach</span>
            </button>
            <button className="flex items-center gap-1">
              <Mic className="w-4 h-4" />
              <span>Voice Message</span>
            </button>
            <button className="flex items-center gap-1">
              <FileSearch className="w-4 h-4" />
              <span>Browse Prompts</span>
            </button>
          </div>
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="mt-12 text-xs text-gray-400 text-center">
          Script may generate inaccurate information about people, places, or
          facts.
        </div>
      </div>
    </div>
  );
}
