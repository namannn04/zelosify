import { Copy, Share2, ThumbsDown, ThumbsUp } from "lucide-react";

export default function InteractionTools() {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <button className="p-1 rounded-full transition-colors duration-200 hover:bg-green-100 dark:hover:bg-green-900 group">
          <ThumbsUp className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-green-500 transition-colors duration-200" />
        </button>
        <button className="p-1 rounded-full transition-colors duration-200 hover:bg-red-100 dark:hover:bg-red-900 group">
          <ThumbsDown className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm py-1 rounded transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105">
          <Copy className="w-5 h-5" />
        </button>
        <button className="p-1 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 group">
          <Share2 className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200" />
        </button>
      </div>
    </div>
  );
}
