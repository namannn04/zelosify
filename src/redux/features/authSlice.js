import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios/AxiosInstance";

const initialState = {
  user: null,
  loading: false,
  error: null,
  showSignoutConfirmation: false,
};

// Async thunk for checking authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const cookies = document.cookie.split(";");
      const hasAccessToken = cookies.some((item) =>
        item.trim().startsWith("access_token=")
      );
      const hasRefreshToken = cookies.some((item) =>
        item.trim().startsWith("refresh_token=")
      );

      if (hasAccessToken || hasRefreshToken) {
        const response = await axiosInstance.get("/auth/user");
        return response.data;
      } else {
        throw new Error("No authentication tokens found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch(logout());
      return "/user"; // Return the navigation path
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
    openSignoutConfirmation: (state) => {
      state.showSignoutConfirmation = true;
    },
    closeSignoutConfirmation: (state) => {
      state.showSignoutConfirmation = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, openSignoutConfirmation, closeSignoutConfirmation } =
  authSlice.actions;
export default authSlice.reducer;
