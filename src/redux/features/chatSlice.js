import axiosInstance from "@/utils/axios/AxiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to create a new chat
export const createNewChat = createAsyncThunk(
  "chat/createNewChat",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/chat/new");
      const conversationId = response.data.conversationId;

      return {
        conversationId,
        newConversation: {
          id: conversationId,
          title: "New Conversation",
          date: new Date().toISOString(), // Serialize date
          messages: [],
        },
      };
    } catch (error) {
      return rejectWithValue("Failed to create new chat. Please try again.");
    }
  }
);

// Async thunk to send a message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ conversationId, message }, { rejectWithValue }) => {
    try {
      const userMessage = {
        id: Date.now().toString(),
        sender: "user",
        content: message,
        timestamp: new Date().toISOString(), // Serialize timestamp
      };

      const response = await axiosInstance.post(`/chat/${conversationId}`, {
        query: message,
        conversationId,
      });

      const aiMessage = {
        id: response.data.messageId || Date.now().toString() + "-ai",
        sender: "ai",
        content: response.data.results,
        timestamp: new Date().toISOString(), // Serialize timestamp
      };

      return { conversationId, userMessage, aiMessage };
    } catch (error) {
      return rejectWithValue("Failed to send message. Please try again.");
    }
  }
);

// Async thunk to switch conversations
export const switchConversation = createAsyncThunk(
  "chat/switchConversation",
  async (conversationId, { getState, rejectWithValue }) => {
    try {
      const { conversations } = getState().chat;
      const conversation = conversations.find((c) => c.id === conversationId);

      return {
        conversationId,
        messages: conversation?.messages || [],
      };
    } catch (error) {
      return rejectWithValue("Failed to switch conversation.");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeConversationId: null,
    messages: [],
    conversations: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewChat.fulfilled, (state, action) => {
        const { conversationId, newConversation } = action.payload;
        state.conversations.unshift(newConversation);
        state.activeConversationId = conversationId;
        state.messages = [];
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { conversationId, userMessage, aiMessage } = action.payload;
        const conversation = state.conversations.find(
          (c) => c.id === conversationId
        );
        if (conversation) {
          conversation.messages.push(userMessage, aiMessage);
        }
      })
      .addCase(switchConversation.fulfilled, (state, action) => {
        state.activeConversationId = action.payload.conversationId;
        state.messages = action.payload.messages;
      });
  },
});

export const { clearError } = chatSlice.actions;
export default chatSlice.reducer;
