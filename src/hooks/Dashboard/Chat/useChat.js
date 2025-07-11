import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  createNewChat,
  sendMessage,
  switchConversation,
  fetchConversations,
  fetchConversationMessages,
  deleteConversation,
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
    isDeletingConversation,
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

  const handleDeleteConversation = useCallback(
    async (conversationId) => {
      try {
        await dispatch(deleteConversation(conversationId)).unwrap();
        toast.success("Chat deleted", {
          description: "The conversation has been successfully deleted.",
        });
      } catch (error) {
        console.error("Error deleting chat:", error);
        toast.error("Failed to delete chat", {
          description:
            error ||
            "There was an error deleting the conversation. Please try again.",
        });
      }
    },
    [dispatch]
  );

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
    isDeletingConversation,
    error,
    handleCreateNewChat,
    handleSendMessage,
    handleSwitchConversation,
    handleFetchConversations,
    handleDeleteConversation,
  };
};

export default useChat;
