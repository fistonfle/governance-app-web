import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL (replace with your backend URL)
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// Fetch all posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const response = await axios.get(`${API_URL}/posts/fetch`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const response = await axios.post(
        `${API_URL}/posts/create-post`,
        newPost,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, post }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    console.log(post);
    try {
      const response = await axios.put(`${API_URL}/posts/${id}`, post, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      await axios.delete(`${API_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return id; // Return the post ID to remove it from the state
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch posts by hashtag
export const fetchPostsByHashtag = createAsyncThunk(
  "posts/fetchPostsByHashtag",
  async (hashtag, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/posts/hashtag/${hashtag}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// fetch post by id
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/posts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPost: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Create Post
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload); // Add new post to the state
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Post
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload; // Update the post
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Posts by Hashtag
      .addCase(fetchPostsByHashtag.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostsByHashtag.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPostsByHashtag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
