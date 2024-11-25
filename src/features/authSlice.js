import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL; // Backend URL from .env

// Async Thunks
// Login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      // Store token in localStorage for persistence
      localStorage.setItem("token", "Bearer " + response.data.token);
      localStorage.setItem("userId", response.data.user.id);
      return response.data; // Assumes response contains user and token
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      // Automatically log in the user after signup if needed
      localStorage.setItem("token", response.data.token);
      return response.data; // Assumes response contains user and token
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  // Clear token from localStorage
  localStorage.removeItem("token");
  return true; // No backend call needed for logout unless required
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null, // Initialize from localStorage
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    resetAuthState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
