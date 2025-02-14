import { useState, useCallback, useMemo } from "react";
import { Clock, ChevronRight, MessageSquare } from "lucide-react";
import { memo } from "react";

const ChatHistory = memo(({ isOpen }) => {
  const [showAllHistory, setShowAllHistory] = useState(false);

  const chatHistory = useMemo(
    () => [
      { id: 1, title: "Website Redesign Discussion", date: "2h ago" },
      { id: 2, title: "Marketing Strategy Planning", date: "1d ago" },
      { id: 3, title: "Product Launch Meeting", date: "2d ago" },
      { id: 4, title: "Team Sync-up", date: "3d ago" },
      { id: 5, title: "Client Presentation Review", date: "1w ago" },
      { id: 6, title: "UX Design Workshop", date: "1w ago" },
      { id: 7, title: "Budget Review", date: "2w ago" },
      { id: 8, title: "Quarterly Goals Setting", date: "2w ago" },
      { id: 9, title: "New Feature Brainstorming", date: "3w ago" },
      { id: 10, title: "Customer Feedback Analysis", date: "3w ago" },
      { id: 11, title: "Client Presentation Review", date: "1w ago" },
      { id: 12, title: "UX Design Workshop", date: "1w ago" },
      { id: 13, title: "Budget Review", date: "2w ago" },
      { id: 14, title: "Quarterly Goals Setting", date: "2w ago" },
      { id: 15, title: "New Feature Brainstorming", date: "3w ago" },
      { id: 16, title: "Customer Feedback Analysis", date: "3w ago" },
    ],
    []
  );

  const displayedHistory = useMemo(
    () => (showAllHistory ? chatHistory : chatHistory.slice(0, 3)),
    [showAllHistory, chatHistory]
  );

  const toggleShowAllHistory = useCallback(() => {
    setShowAllHistory((prev) => !prev);
  }, []);

  const renderChatItem = useCallback(
    (chat) => (
      <button
        key={chat.id}
        className="w-full flex items-center gap-1 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors rounded-md 
        dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <MessageSquare className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-400" />
        {isOpen && (
          <div className="flex items-center justify-between w-full overflow-hidden">
            <span className="text-xs truncate">{chat.title}</span>
            <span className="text-xs text-gray-400 dark:text-gray-400 shrink-0">
              {chat.date}
            </span>
          </div>
        )}
      </button>
    ),
    [isOpen]
  );

  return (
    <div className="space-y-2 pl-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
        <Clock className="h-5 w-5" />
        {isOpen && <span>Recent Chats</span>}
      </div>
      <div className="space-y-1 px-3">
        {displayedHistory.map(renderChatItem)}
      </div>
      {chatHistory.length > 3 && isOpen && (
        <button
          onClick={toggleShowAllHistory}
          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors 
          dark:text-blue-400 dark:hover:text-blue-500"
        >
          {showAllHistory ? "Show less" : "Show more"}
          <ChevronRight
            className={`h-3 w-3 transition-transform ${
              showAllHistory ? "rotate-90" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
});

ChatHistory.displayName = "ChatHistory";
export default ChatHistory;
