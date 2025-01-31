import React, { useState, useCallback, useMemo } from "react"
import { Clock, ChevronRight, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ChatHistory = React.memo(({ isOpen }) => {
  const [showAllHistory, setShowAllHistory] = useState(false)

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
    ],
    [],
  )

  const displayedHistory = useMemo(
    () => (showAllHistory ? chatHistory : chatHistory.slice(0, 3)),
    [showAllHistory, chatHistory],
  )

  const toggleShowAllHistory = useCallback(() => {
    setShowAllHistory((prev) => !prev)
  }, [])

  const renderChatItem = useCallback(
    (chat) => (
      <button
        key={chat.id}
        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors rounded-md"
      >
        <MessageSquare className="h-4 w-4 shrink-0 text-gray-400" />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center justify-between w-full overflow-hidden"
            >
              <span className="truncate">{chat.title}</span>
              <span className="text-xs text-gray-400 shrink-0">{chat.date}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    ),
    [isOpen],
  )

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        <Clock className="h-4 w-4" />
        {isOpen && <span>Recent Chats</span>}
      </div>
      <div className="space-y-1">{displayedHistory.map(renderChatItem)}</div>
      {chatHistory.length > 3 && isOpen && (
        <button
          onClick={toggleShowAllHistory}
          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          {showAllHistory ? "Show less" : "Show more"}
          <ChevronRight className={`h-3 w-3 transition-transform ${showAllHistory ? "rotate-90" : ""}`} />
        </button>
      )}
    </div>
  )
})

ChatHistory.displayName = "ChatHistory"
export default ChatHistory

