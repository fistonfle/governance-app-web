// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import postsReducer from "./features/postsSlice";
import commentSlice from "./features/commentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentSlice,
  },
});
