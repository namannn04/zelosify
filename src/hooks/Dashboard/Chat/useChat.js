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

  const handleCreateNewChat = useCallback(() => {
    dispatch(createNewChat());
  }, [dispatch]);

  const handleSendMessage = useCallback(
    (message) => {
      if (activeConversationId) {
        dispatch(
          sendMessage({ conversationId: activeConversationId, message })
        );
      }
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
