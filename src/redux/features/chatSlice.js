import axiosInstance from "@/utils/axios/AxiosInstance";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

// Async thunk to create a new chat
export const createNewChat = createAsyncThunk(
  "chat/createNewChat",
  async (_, { rejectWithValue }) => {
    try {
      const conversationId = "newChat";

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

      if (conversationId === "newChat") {
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

      return { userMessage, aiMessage };
    } catch (error) {
      return rejectWithValue("Failed to send message. Please try again.");
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
        state.conversations.push(newConversation); // Changed from unshift to push
        state.activeConversationId = conversationId;
        state.messages = [];
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { userMessage, aiMessage } = action.payload;
        state.messages.push(userMessage);
        state.messages.push(aiMessage);
      })
      .addCase(updateConversationId, (state, action) => {
        const { oldConversationId, newConversationId, title } = action.payload;
        const conversationIndex = state.conversations.findIndex(
          (conversation) => conversation.id === oldConversationId
        );
        if (conversationIndex !== -1) {
          state.conversations[conversationIndex].id = newConversationId;
          state.conversations[conversationIndex].title = title;
        }
        state.activeConversationId = newConversationId;
      })
      .addCase(switchConversation, (state, action) => {
        state.activeConversationId = action.payload;
        const conversation = state.conversations.find(
          (conv) => conv.id === action.payload
        );
        state.messages = conversation ? conversation.messages : [];
      });
  },
});

export const { clearError } = chatSlice.actions;
export default chatSlice.reducer;
