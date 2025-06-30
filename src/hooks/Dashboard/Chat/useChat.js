import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createNewChat,
  sendMessage,
  switchConversation,
} from "@/redux/features/chatSlice";
import { useCallback } from "react";

const useChat = () => {
  const dispatch = useDispatch();
  const { activeConversationId, messages, conversations, isLoading, error } =
    useSelector((state) => state.chat);

  useEffect(() => {
    // Initialize a new chat locally when the page loads
    if (!conversations.some((conv) => conv.id === "newChat")) {
      dispatch(
        createNewChat({
          conversationId: "newChat",
          newConversation: {
            id: "newChat",
            title: "New Conversation",
            date: new Date().toISOString(),
            messages: [],
          },
        })
      );
    }
  }, [dispatch, conversations]);

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
    },
    [dispatch]
  );

  return {
    activeConversationId,
    messages,
    conversations,
    isLoading,
    error,
    handleCreateNewChat,
    handleSendMessage,
    handleSwitchConversation,
  };
};

export default useChat;
