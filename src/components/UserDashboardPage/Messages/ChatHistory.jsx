"use client";
import { Clock, ChevronRight, MessageSquare } from "lucide-react";
import { memo, useState, useMemo, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";

const ChatHistory = memo(() => {
  const [isOpen, setIsOpen] = useState(true);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const chatHistory = useMemo(
    () => [
      {
        id: 1,
        title: "Website Redesign Discussion",
        date: new Date(),
      },
      {
        id: 2,
        title: "Marketing Strategy Planning",
        date: new Date(Date.now() - 86400000),
      },
      {
        id: 3,
        title: "Product Launch Meeting",
        date: new Date(Date.now() - 2 * 86400000),
      },
      {
        id: 4,
        title: "Team Sync-up",
        date: new Date(Date.now() - 3 * 86400000),
      },
      {
        id: 5,
        title: "Client Presentation Review",
        date: new Date(Date.now() - 7 * 86400000),
      },
      {
        id: 6,
        title: "UX Design Workshop",
        date: new Date(Date.now() - 7 * 86400000),
      },
      {
        id: 7,
        title: "Budget Review",
        date: new Date(Date.now() - 14 * 86400000),
      },
      {
        id: 8,
        title: "Quarterly Goals Setting",
        date: new Date(Date.now() - 14 * 86400000),
      },
      {
        id: 9,
        title: "New Feature Brainstorming",
        date: new Date(Date.now() - 21 * 86400000),
      },
      {
        id: 10,
        title: "Customer Feedback Analysis",
        date: new Date(Date.now() - 21 * 86400000),
      },
      {
        id: 11,
        title: "Client Presentation Review",
        date: new Date(Date.now() - 7 * 86400000),
      },
      {
        id: 12,
        title: "UX Design Workshop",
        date: new Date(Date.now() - 7 * 86400000),
      },
      {
        id: 13,
        title: "Budget Review",
        date: new Date(Date.now() - 14 * 86400000),
      },
      {
        id: 14,
        title: "Quarterly Goals Setting",
        date: new Date(Date.now() - 14 * 86400000),
      },
      {
        id: 15,
        title: "New Feature Brainstorming",
        date: new Date(Date.now() - 21 * 86400000),
      },
      {
        id: 16,
        title: "Customer Feedback Analysis",
        date: new Date(Date.now() - 21 * 86400000),
      },
    ],
    []
  );

  const filteredHistory = useMemo(
    () =>
      chatHistory.filter((chat) =>
        chat.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, chatHistory]
  );

  const displayedHistory = useMemo(
    () => (showAllHistory ? filteredHistory : filteredHistory.slice(0, 3)),
    [showAllHistory, filteredHistory]
  );

  const toggleShowAllHistory = useCallback(() => {
    setShowAllHistory((prev) => !prev);
  }, []);

  const renderChatItem = useCallback(
    (chat) => (
      <button
        key={chat.id}
        className="w-full flex items-center gap-2 py-2 px-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors rounded-md 
        dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <MessageSquare className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-400" />
        {isOpen && (
          <div className="flex items-center justify-between w-full overflow-hidden">
            <span className="text-xs truncate">{chat.title}</span>
            <span className="text-xs text-gray-400 dark:text-gray-400 shrink-0">
              {formatDistanceToNow(new Date(chat.date), { addSuffix: true })}
            </span>
          </div>
        )}
      </button>
    ),
    [isOpen]
  );

  return (
    <div className="space-y-6 px-3 py-4">
      <div className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-300">
        <Clock className="h-5 w-5" />
        {isOpen && <span>Recent Chats</span>}
      </div>

      <div className="space-y-1">{displayedHistory.map(renderChatItem)}</div>
      {filteredHistory.length > 3 && isOpen && (
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
