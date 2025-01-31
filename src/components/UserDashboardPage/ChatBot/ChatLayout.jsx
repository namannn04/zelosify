import {
  FileSearch,
  Mic,
  Paperclip,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Share2,
  RotateCcw,
  Settings,
  Plus,
  Copy,
  Trash,
} from "lucide-react";

export default function ChatLayout() {
  return (
    <div className="w-full text-sm max-w-5xl bg-white rounded-lg shadow-sm flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
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

      {/* Chat Content */}

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        {/*1st User Message */}
        <div className="flex gap-3">
          <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center font-medium">
            JD
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-base">John Doe</span>
              <span className="text-gray-500 text-xs">Just now</span>
            </div>
            <div className="inline-block max-w-[70%]">
              <p className="text-gray-900">
                Generate 5 attention-grabbing headlines for an article about AI
                Chat Copywriter
              </p>
            </div>
          </div>
        </div>

        {/*1st AI Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[url('/favicon.ico')] bg-cover bg-center flex-shrink-0"></div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex-center font-medium text-base">
                Zelosify AI
              </span>
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

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded-full transition-colors duration-200 hover:bg-green-100 group">
                    <ThumbsUp className="w-5 h-5 text-gray-500 group-hover:text-green-500 transition-colors duration-200" />
                  </button>
                  <button className="p-1 rounded-full transition-colors duration-200 hover:bg-red-100 group">
                    <ThumbsDown className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 text-gray-500 text-sm px-2 py-1 rounded transition-all duration-200 hover:bg-gray-100 hover:scale-105">
                    <Copy className="w-5 h-5" />
                  </button>
                  <button className="p-1 rounded-full transition-all duration-200 hover:bg-gray-100 hover:scale-105 group">
                    <Share2 className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*1st User Message */}
        <div className="flex gap-3">
          <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center font-medium">
            JD
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-base">John Doe</span>
              <span className="text-gray-500 text-xs">Just now</span>
            </div>
            <div className="inline-block max-w-[70%]">
              <p className="text-gray-900">
                Generate 5 attention-grabbing headlines for an article about AI
                Chat Copywriter
              </p>
            </div>
          </div>
        </div>

        {/*1st AI Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[url('/favicon.ico')] bg-cover bg-center flex-shrink-0"></div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex-center font-medium text-base">
                Zelosify AI
              </span>
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

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded-full transition-colors duration-200 hover:bg-green-100 group">
                    <ThumbsUp className="w-5 h-5 text-gray-500 group-hover:text-green-500 transition-colors duration-200" />
                  </button>
                  <button className="p-1 rounded-full transition-colors duration-200 hover:bg-red-100 group">
                    <ThumbsDown className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 text-gray-500 text-sm px-2 py-1 rounded transition-all duration-200 hover:bg-gray-100 hover:scale-105">
                    <Copy className="w-5 h-5" />
                  </button>
                  <button className="p-1 rounded-full transition-all duration-200 hover:bg-gray-100 hover:scale-105 group">
                    <Share2 className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regenerate Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 text-sm">
            <RotateCcw className="h-4 w-4" />
            Regenerate
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t px-4 pt-4">
        <div className="relative flex items-center">
          {/* Left Side Icons */}
          <div className="absolute left-2 flex items-center gap-1 pr-3 border-r">
            <div className="group relative">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Paperclip className="w-4 h-4 text-gray-900" />
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                Attach File
              </span>
            </div>

            <div className="group relative">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Mic className="w-4 h-4 text-gray-900" />
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                Record Audio
              </span>
            </div>

            <div className="group relative">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FileSearch className="w-4 h-4 text-gray-900" />
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                Search File
              </span>
            </div>
          </div>

          {/* Input Field (Keeps the original padding) */}
          <input
            type="text"
            placeholder="Send a message"
            className="border w-full pl-36 pr-14 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />

          {/* Send Button (Proper Alignment) */}
          <div className="absolute right-3 flex items-center">
            <div className="group relative">
              <button className="p-1 hover:bg-gray-800 rounded-full bg-black flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                Send Message
              </span>
            </div>
          </div>
        </div>

        {/* Warning Text */}
        <div className="mt-2 mb-1 text-xs text-gray-400 text-center">
          Model may generate inaccurate information about people, places, or
          facts.
        </div>
      </div>
    </div>
  );
}
