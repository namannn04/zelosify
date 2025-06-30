import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createNewChat,
  sendMessage,
  switchConversation,
  fetchConversations,
  fetchConversationMessages,
} from "@/redux/features/Dashboard/chatSlice";

// Prevent multiple fetch requests across hook instances
let globalFetchRef = { current: false };

const useChat = () => {
  const dispatch = useDispatch();
  const {
    activeConversationId,
    messages,
    conversations,
    isLoading,
    isSendingMessage,
    error,
    hasFetchedConversations,
  } = useSelector((state) => state.chat);

  // Fetch conversations on mount (once per session)
  useEffect(() => {
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
      dispatch(fetchConversationMessages(conversationId));
    },
    [dispatch]
  );

  const handleFetchConversations = useCallback(() => {
    globalFetchRef.current = false; // Reset to allow fresh fetch
    dispatch(fetchConversations());
  }, [dispatch]);

  // Reset fetch ref when conversations are cleared (logout)
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
    isSendingMessage,
    error,
    handleCreateNewChat,
    handleSendMessage,
    handleSwitchConversation,
    handleFetchConversations,
  };
};

export default useChat;
