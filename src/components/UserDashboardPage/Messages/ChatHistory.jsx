"use client";
import { Clock, ChevronRight, MessageSquare, Search } from "lucide-react";
import { memo, useState, useMemo, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";

const ChatHistory = memo(
  ({
    conversations = [],
    activeConversationId,
    onSelectConversation,
    isLoading = false,
  }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [showAllHistory, setShowAllHistory] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredConversations = useMemo(() => {
      if (!searchTerm.trim()) return conversations;

      return conversations.filter(
        (conversation) =>
          conversation.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          conversation.lastMessage
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }, [searchTerm, conversations]);

    const displayedConversations = useMemo(
      () =>
        showAllHistory
          ? filteredConversations
          : filteredConversations.slice(0, 5),
      [showAllHistory, filteredConversations]
    );

    const toggleShowAllHistory = useCallback(() => {
      setShowAllHistory((prev) => !prev);
    }, []);

    const handleSearchChange = useCallback((e) => {
      setSearchTerm(e.target.value);
    }, []);

    const handleConversationSelect = useCallback(
      (conversationId) => {
        onSelectConversation?.(conversationId);
      },
      [onSelectConversation]
    );

    const renderConversationItem = useCallback(
      (conversation) => {
        const isActive = conversation.conversationId === activeConversationId;
        const displayDate = conversation.timestamp
          ? new Date(conversation.timestamp)
          : new Date();

        return (
          <button
            onClick={() =>
              handleConversationSelect(conversation.conversationId)
            }
            className={`w-full flex items-start gap-2 py-3 px-2 text-sm transition-colors rounded-md group
            ${
              isActive
                ? "bg-blue-50 border-l-2 border-blue-500 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <MessageSquare
              className={`h-4 w-4 shrink-0 mt-0.5 ${
                isActive ? "text-blue-500" : "text-gray-400"
              }`}
            />
            {isOpen && (
              <div className="flex flex-col w-full overflow-hidden text-left">
                <span className="text-xs font-medium truncate mb-1">
                  {conversation.title || "Untitled Conversation"}
                </span>
                {/* {conversation.lastMessage && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate mb-1">
                    {conversation.lastMessage}
                  </span>
                )} */}
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {formatDistanceToNow(displayDate, { addSuffix: true })}
                </span>
              </div>
            )}
          </button>
        );
      },
      [isOpen, activeConversationId, handleConversationSelect]
    );

    if (isLoading && conversations.length === 0) {
      return (
        <div className="space-y-6 px-3 py-4">
          <div className="flex items-center font-medium text-gray-600 dark:text-gray-300">
            <Clock className="h-5 w-5" />
            {isOpen && <span>Recent Chats</span>}
          </div>
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div key={`skeleton-${index}`} className="animate-pulse">
                <div className="flex items-center gap-2 py-2 px-2">
                  <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  {isOpen && (
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 px-3 py-4 h-full flex flex-col">
        <div className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-300">
          <Clock className="h-5 w-5" />
          {isOpen && <span>Recent Chats</span>}
        </div>

        {isOpen && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-3 py-2 text-xs border border-gray-200 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-1">
          {displayedConversations.length === 0 ? (
            <div className="text-center py-8">
              {isOpen && (
                <div className="text-gray-400 dark:text-gray-500 text-xs">
                  {searchTerm
                    ? "No conversations found"
                    : "No conversations yet"}
                </div>
              )}
            </div>
          ) : (
            displayedConversations.map((conversation, index) => (
              <div key={conversation.conversationId || `conversation-${index}`}>
                {renderConversationItem(conversation)}
              </div>
            ))
          )}
        </div>

        {filteredConversations.length > 5 && isOpen && (
          <button
            onClick={toggleShowAllHistory}
            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors 
                   dark:text-blue-400 dark:hover:text-blue-500 py-2"
          >
            {showAllHistory
              ? "Show less"
              : `Show ${filteredConversations.length - 5} more`}
            <ChevronRight
              className={`h-3 w-3 transition-transform ${
                showAllHistory ? "rotate-90" : ""
              }`}
            />
          </button>
        )}
      </div>
    );
  }
);

ChatHistory.displayName = "ChatHistory";
export default ChatHistory;
