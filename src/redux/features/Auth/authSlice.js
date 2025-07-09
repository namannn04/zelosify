import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/Axios/AxiosInstance";
import { clearAuthData } from "@/utils/Auth/authUtils";

// Helper functions for localStorage
const loadUserFromStorage = () => {
  if (typeof window === "undefined") return null; // Handle SSR
  try {
    const storedUser = localStorage.getItem("zelosify_user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
    return null;
  }
};

const saveUserToStorage = (user) => {
  if (typeof window === "undefined") return; // Handle SSR
  try {
    if (user) {
      localStorage.setItem("zelosify_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("zelosify_user");
    }
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

const initialState = {
  user: loadUserFromStorage(),
  loading: false,
  error: null,
  showSignoutConfirmation: false,
};

// Track if an auth check is already in progress to prevent duplicate requests
let authCheckInProgress = false;

// Async thunk for checking authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (options = {}, { rejectWithValue }) => {
    // Destructure options with defaults
    const {
      isAuthPage = false, // true if we're on a login/register page
      pathname = "", // current route path for more specific checks
    } = options;

    try {
      // Skip auth check on auth pages completely
      if (isAuthPage || !pathname.includes("/user")) {
        return null;
      }

      // If a check is already in progress, skip this one
      if (authCheckInProgress) {
        return null; // Will be ignored in reducer since we handle null case
      }

      authCheckInProgress = true;

      // Try to load from storage first
      const storedUser = loadUserFromStorage();

      // If we have user data in localStorage, use it and don't make an API call
      if (storedUser) {
        authCheckInProgress = false;
        return storedUser;
      }

      // No user in localStorage, make a single API call to fetch user data
      try {
        const response = await axiosInstance.get("/auth/user");
        // Save the user data to localStorage
        saveUserToStorage(response.data);
        authCheckInProgress = false;
        return response.data;
      } catch (apiError) {
        // API call failed, we have no user data
        authCheckInProgress = false;
        throw new Error("No authentication tokens found");
      }
    } catch (error) {
      authCheckInProgress = false;
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for login with credentials
export const loginWithCredentials = createAsyncThunk(
  "auth/loginWithCredentials",
  async ({ usernameOrEmail, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/verify-login", {
        usernameOrEmail,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login verification failed"
      );
    }
  }
);

// Async thunk for verifying TOTP
export const verifyTOTP = createAsyncThunk(
  "auth/verifyTOTP",
  async ({ totp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/verify-totp", {
        totp,
      });
      // Save the user data to localStorage after successful TOTP verification
      if (response.data && response.data.user) {
        saveUserToStorage(response.data.user);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "TOTP verification failed"
      );
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
      // Clear all auth data (cookies and localStorage)
      clearAuthData();
      saveUserToStorage(null);
    },
    openSignoutConfirmation: (state) => {
      state.showSignoutConfirmation = true;
    },
    closeSignoutConfirmation: (state) => {
      state.showSignoutConfirmation = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      saveUserToStorage(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle checkAuthStatus
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Only update user if we got a non-null payload
        // (null means we skipped the request because one was already in progress)
        if (action.payload !== null) {
          state.user = action.payload;
        }
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null; // Clear user on auth check failure
        saveUserToStorage(null);
      })

      // Handle loginWithCredentials
      .addCase(loginWithCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithCredentials.fulfilled, (state) => {
        state.loading = false;
        // Don't set user yet, as we need TOTP verification
      })
      .addCase(loginWithCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle verifyTOTP
      .addCase(verifyTOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyTOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(verifyTOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  logout,
  openSignoutConfirmation,
  closeSignoutConfirmation,
  setUser,
} = authSlice.actions;
export default authSlice.reducer;
