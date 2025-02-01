import React from "react";
import { FileSearch, Mic, Paperclip, ArrowRight } from "lucide-react";

export default function InputArea() {
  return (
    <div className="border-t px-4 pt-4 text-sm">
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
  );
}
