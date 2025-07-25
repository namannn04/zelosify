import axiosInstance from "@/utils/Axios/AxiosInstance";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

// Async thunk to fetch conversations list
export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/chat/list");
      return response.data.conversations || [];
    } catch (error) {
      return rejectWithValue("Failed to fetch conversations.");
    }
  }
);

// Async thunk to create a new chat
export const createNewChat = createAsyncThunk(
  "chat/createNewChat",
  async (_, { rejectWithValue }) => {
    try {
      const conversationId = "newChat";

      return {
        conversationId,
      };
    } catch (error) {
      return rejectWithValue("Failed to create new chat locally.");
    }
  }
);

// Async thunk to send a message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ conversationId, message }, { rejectWithValue, dispatch }) => {
    try {
      const userMessage = {
        id: Date.now().toString(),
        sender: "user",
        content: message,
        timestamp: new Date().toISOString(),
      };

      let response;
      const isNewChat = conversationId === "newChat";

      if (isNewChat) {
        // Send request to create a new chat
        response = await axiosInstance.post(`/chat/${conversationId}`, {
          query: message,
          conversationId,
        });

        // Update conversationId with the backend response
        const newConversationId = response.data.conversationId;
        const newTitle = response.data.title;

        dispatch(
          updateConversationId({
            oldConversationId: conversationId,
            newConversationId,
            title: newTitle,
          })
        );

        conversationId = newConversationId; // Update for subsequent messages
      } else {
        // Send message to existing conversation
        response = await axiosInstance.post(`/chat/${conversationId}`, {
          query: message,
          conversationId,
        });
      }

      const aiMessage = {
        id: response.data.messageId || Date.now().toString() + "-ai",
        sender: "ai",
        content: response.data.answer,
        timestamp: new Date().toISOString(),
      };

      // Refetch conversations for new chats to update sidebar
      if (isNewChat) {
        dispatch(fetchConversations());
      }

      return { userMessage, aiMessage };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send message. Please try again.";

      // Return error info for display in chat
      return rejectWithValue({
        message: errorMessage,
        timestamp: new Date().toISOString(),
      });
    }
  }
);

// Async thunk to fetch messages for a specific conversation
export const fetchConversationMessages = createAsyncThunk(
  "chat/fetchConversationMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chat/list/${conversationId}`);
      const backendMessages = response.data.conversation?.messages || [];

      // Transform backend format (query/answer) to frontend format (user/ai messages)
      const transformedMessages = [];

      backendMessages.forEach((msg, index) => {
        // Add user message
        transformedMessages.push({
          id: `${conversationId}-user-${index}`,
          sender: "user",
          content: msg.query,
          timestamp: msg.timestamp,
        });

        // Add AI message
        transformedMessages.push({
          id: `${conversationId}-ai-${index}`,
          sender: "ai",
          content: msg.answer,
          timestamp: msg.timestamp,
        });
      });

      return {
        conversationId,
        messages: transformedMessages,
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch conversation messages.");
    }
  }
);

// Async thunk to delete a conversation
export const deleteConversation = createAsyncThunk(
  "chat/deleteConversation",
  async (conversationId, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete(`/chat/${conversationId}`);

      // Refetch conversations to update the list
      dispatch(fetchConversations());

      return { conversationId };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete conversation.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateConversationId = createAction(
  "chat/updateConversationId",
  ({ oldConversationId, newConversationId, title }) => ({
    payload: { oldConversationId, newConversationId, title },
  })
);

export const switchConversation = createAction(
  "chat/switchConversation",
  (conversationId) => ({
    payload: conversationId,
  })
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeConversationId: "newChat",
    conversations: [], // Changed from object to array
    messages: [],
    isLoading: false,
    isSendingMessage: false, // Separate loading state for sending messages
    isDeletingConversation: false, // Loading state for deleting conversations
    error: null,
    hasFetchedConversations: false,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    addTypingIndicator(state) {
      // Add typing indicator when user sends message
      const typingMessage = {
        id: `typing-${Date.now()}`,
        sender: "ai",
        content: "Zelosify AI is thinking...",
        timestamp: new Date().toISOString(),
        isTyping: true,
      };
      state.messages.push(typingMessage);
    },
    removeTypingIndicator(state) {
      // Remove typing indicator
      state.messages = state.messages.filter((msg) => !msg.isTyping);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversations = action.payload;
        state.hasFetchedConversations = true;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.hasFetchedConversations = true; // Even on error, mark as attempted
      })
      .addCase(createNewChat.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewChat.fulfilled, (state, action) => {
        state.isLoading = false;
        const { conversationId } = action.payload;
        // Don't show in sidebar until first AI response
        state.activeConversationId = conversationId;
        state.messages = [];
      })
      .addCase(createNewChat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.isSendingMessage = true;
        state.error = null;

        // Add user message immediately
        const userMessage = {
          id: Date.now().toString(),
          sender: "user",
          content: action.meta.arg.message,
          timestamp: new Date().toISOString(),
        };
        state.messages.push(userMessage);

        // Add typing indicator
        const typingMessage = {
          id: `typing-${Date.now()}`,
          sender: "ai",
          content: "Zelosify AI is thinking...",
          timestamp: new Date().toISOString(),
          isTyping: true,
        };
        state.messages.push(typingMessage);
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSendingMessage = false;

        // Remove typing indicator
        state.messages = state.messages.filter((msg) => !msg.isTyping);

        // Add AI response
        const { aiMessage } = action.payload;
        state.messages.push(aiMessage);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSendingMessage = false;

        // Remove typing indicator
        state.messages = state.messages.filter((msg) => !msg.isTyping);

        // Add error message as AI response
        const errorMessage = {
          id: `error-${Date.now()}`,
          sender: "ai",
          content: `Error: ${
            action.payload?.message ||
            action.payload ||
            "Failed to send message. Please try again."
          }`,
          timestamp: action.payload?.timestamp || new Date().toISOString(),
          isError: true,
        };
        state.messages.push(errorMessage);
        state.error = action.payload;
      })
      .addCase(fetchConversationMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchConversationMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        const { conversationId, messages } = action.payload;
        state.activeConversationId = conversationId;
        state.messages = messages;
      })
      .addCase(fetchConversationMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateConversationId, (state, action) => {
        const { oldConversationId, newConversationId, title } = action.payload;
        const conversationIndex = state.conversations.findIndex(
          (conversation) => conversation.conversationId === oldConversationId
        );
        if (conversationIndex !== -1) {
          state.conversations[conversationIndex].conversationId =
            newConversationId;
          state.conversations[conversationIndex].title = title;
        }
        state.activeConversationId = newConversationId;
      })
      .addCase(switchConversation, (state, action) => {
        state.activeConversationId = action.payload;
        // Messages will be loaded separately via fetchConversationMessages
        state.messages = [];
      })
      .addCase(deleteConversation.pending, (state) => {
        state.isDeletingConversation = true;
        state.error = null;
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.isDeletingConversation = false;
        const { conversationId } = action.payload;

        // Remove conversation from the list
        state.conversations = state.conversations.filter(
          (conv) => conv.conversationId !== conversationId
        );

        // If deleted conversation was active, reset to new chat
        if (state.activeConversationId === conversationId) {
          state.activeConversationId = "newChat";
          state.messages = [];
        }
      })
      .addCase(deleteConversation.rejected, (state, action) => {
        state.isDeletingConversation = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, addTypingIndicator, removeTypingIndicator } =
  chatSlice.actions;
export default chatSlice.reducer;
