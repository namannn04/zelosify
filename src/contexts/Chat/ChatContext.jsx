"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axiosInstance from "@/utils/axios/AxiosInstance";
import { usePathname } from "next/navigation";

// Create the chat context
const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  // State for chat data
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pathname = usePathname();

  // Create a new chat conversation
  const createNewChat = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Creating new chat conversation");
      const response = await axiosInstance.post("/new-chat");

      const conversationId = response.data.conversationId;
      console.log("New conversation created:", conversationId);

      // Add the new conversation to the list
      const newConversation = {
        id: conversationId,
        title: "New Conversation",
        date: new Date(),
        messages: [],
      };

      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversationId(conversationId);
      setMessages([]);

      return conversationId;
    } catch (err) {
      console.error("Error creating new chat:", err);
      setError("Failed to create new chat. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send a message to the active conversation
  const sendMessage = useCallback(
    async (message) => {
      if (!activeConversationId) {
        console.error("No active conversation");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Add the user message to the UI immediately
        const userMessage = {
          id: Date.now().toString(),
          sender: "user",
          content: message,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);

        // Send the message to the backend
        console.log(
          `Sending message to conversation ${activeConversationId}:`,
          message
        );
        const response = await axiosInstance.post(
          `/rag-chat/${activeConversationId}`,
          {
            query: message,
            conversationId: activeConversationId,
          }
        );

        // Add the AI response to the messages
        const aiMessage = {
          id: response.data.messageId || Date.now().toString() + "-ai",
          sender: "ai",
          content: response.data.results,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);

        // Update the conversation title if this is the first message
        if (
          conversations.find((c) => c.id === activeConversationId)?.title ===
          "New Conversation"
        ) {
          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === activeConversationId
                ? {
                    ...conv,
                    title:
                      message.substring(0, 30) +
                      (message.length > 30 ? "..." : ""),
                  }
                : conv
            )
          );
        }
      } catch (err) {
        console.error("Error sending message:", err);
        setError("Failed to send message. Please try again.");

        // Show the error as an AI message
        const errorMessage = {
          id: Date.now().toString() + "-error",
          sender: "ai",
          content:
            "Sorry, I encountered an error processing your request. Please try again.",
          timestamp: new Date(),
          isError: true,
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [activeConversationId, conversations]
  );

  // Switch to a different conversation
  const switchConversation = useCallback(
    (conversationId) => {
      setActiveConversationId(conversationId);
      const conversation = conversations.find((c) => c.id === conversationId);
      setMessages(conversation?.messages || []);
    },
    [conversations]
  );

  // Load chat history (mock implementation since user mentioned leaving history for later)
  const loadChatHistory = useCallback(async () => {
    // This is a placeholder - actual implementation would fetch from backend
    setConversations([]);
  }, []);

  // Initialize by creating a new chat if there's no active conversation
  useEffect(() => {
    if (
      pathname === "/user" &&
      !activeConversationId &&
      conversations.length === 0
    ) {
      createNewChat();
    }
  }, [activeConversationId, conversations.length, createNewChat, pathname]);

  // Context value
  const contextValue = {
    activeConversationId,
    messages,
    conversations,
    isLoading,
    error,
    createNewChat,
    sendMessage,
    switchConversation,
    loadChatHistory,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

// Hook to use the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export default ChatContext;
