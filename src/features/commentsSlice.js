// features/commentsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL (replace with your backend URL)
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// Post a comment
export const postComment = createAsyncThunk(
  "comments/postComment",
  async ({ postId, comment }, { getState }) => {
    const { user } = getState().auth; // Access user state
    const response = await axios.post(
      `${API_URL}/comments`,
      {
        postId,
        content: comment,
        userId: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments.push(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
