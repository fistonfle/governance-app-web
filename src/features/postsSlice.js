import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL (replace with your backend URL)
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// Fetch all posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { getState }) => {
    const { auth } = getState(); // Access the auth state
    const response = await axios.get(`${API_URL}/posts/fetch`, {
      headers: {
        Authorization: `Bearer ${auth.token}`, // Use token from the auth state
      },
    });
    return response.data;
  }
);

// Create a new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost, { getState }) => {
    const { auth } = getState(); // Access the auth state
    const response = await axios.post(`${API_URL}/posts/create-post`, newPost, {
      headers: {
        Authorization: `Bearer ${auth.token}`, // Use token from the auth state
      },
    });
    return response.data;
  }
);

// Update a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, postDetails }, { getState }) => {
    const { auth } = getState(); // Access the auth state
    const response = await axios.put(`${API_URL}/posts/${id}`, postDetails, {
      headers: {
        Authorization: `Bearer ${auth.token}`, // Use token from the auth state
      },
    });
    return response.data;
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { getState }) => {
    const { auth } = getState(); // Access the auth state
    const response = await axios.delete(`${API_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`, // Use token from the auth state
      },
    });
    return response.data;
  }
);

// Posts slice
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: null,
    status: "idle",
    error: null,
  },
  reducers: {
    // Additional synchronous actions if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Create Post
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Update Post
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload; // Update the post in the state
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        ); // Remove the post from the state
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
