import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createNewChat,
  sendMessage,
  switchConversation,
  fetchConversations,
  fetchConversationMessages,
} from "@/redux/features/chatSlice";
import { useCallback } from "react";

// Global ref to prevent multiple fetch requests across all hook instances
let globalFetchRef = { current: false };

const useChat = () => {
  const dispatch = useDispatch();
  const {
    activeConversationId,
    messages,
    conversations,
    isLoading,
    error,
    hasFetchedConversations,
  } = useSelector((state) => state.chat);

  useEffect(() => {
    // Only fetch conversations if we haven't fetched them yet globally
    if (!hasFetchedConversations && !globalFetchRef.current && !isLoading) {
      globalFetchRef.current = true;
      dispatch(fetchConversations());
    }
  }, [dispatch, hasFetchedConversations, isLoading]);

  const handleCreateNewChat = useCallback(() => {
    dispatch(createNewChat());
  }, [dispatch]);

  const handleSendMessage = useCallback(
    (message) => {
      dispatch(
        sendMessage({
          conversationId: activeConversationId,
          message,
        })
      );
    },
    [activeConversationId, dispatch]
  );

  const handleSwitchConversation = useCallback(
    (conversationId) => {
      dispatch(switchConversation(conversationId));
      // Fetch messages for the selected conversation
      dispatch(fetchConversationMessages(conversationId));
    },
    [dispatch]
  );

  const handleFetchConversations = useCallback(() => {
    // Reset the global ref and force a new fetch
    globalFetchRef.current = false;
    dispatch(fetchConversations());
  }, [dispatch]);

  // Reset global ref if conversations are cleared (e.g., on logout)
  useEffect(() => {
    if (conversations.length === 0 && hasFetchedConversations) {
      globalFetchRef.current = false;
    }
  }, [conversations.length, hasFetchedConversations]);

  return {
    activeConversationId,
    messages,
    conversations,
    isLoading,
    error,
    handleCreateNewChat,
    handleSendMessage,
    handleSwitchConversation,
    handleFetchConversations,
  };
};

export default useChat;
