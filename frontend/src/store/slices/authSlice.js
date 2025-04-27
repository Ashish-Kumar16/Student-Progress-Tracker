import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Utility function to handle token storage
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Utility function to handle errors
const handleError = (error) =>
  error.response?.data?.message || "An error occurred";

// Async thunks
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/me`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/update-profile`,
        profileData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/update-password`,
        passwordData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const updateNotifications = createAsyncThunk(
  "auth/updateNotifications",
  async (notificationSettings, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/update-notifications`,
        notificationSettings,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      setAuthToken(null);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      setAuthToken(action.payload.token);
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      // Signup
      .addCase(signup.pending, handlePending)
      .addCase(signup.fulfilled, handleFulfilled)
      .addCase(signup.rejected, handleRejected)

      // Login
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleFulfilled)
      .addCase(login.rejected, handleRejected)

      // Fetch User Info
      .addCase(fetchUserInfo.pending, handlePending)
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserInfo.rejected, handleRejected)

      // Update Profile
      .addCase(updateProfile.pending, handlePending)
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload.user };
      })
      .addCase(updateProfile.rejected, handleRejected)

      // Update Password
      .addCase(updatePassword.pending, handlePending)
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, handleRejected)

      // Update Notifications
      .addCase(updateNotifications.pending, handlePending)
      .addCase(updateNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
          notifications: action.payload.notifications,
        };
      })
      .addCase(updateNotifications.rejected, handleRejected);
  },
});

export const { logout, clearError } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
