import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../postDTO";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
  fetchAuthors,
} from "../postThunks";

interface PostsState {
  posts: Post[];
  authors: Record<number, string>;
  loading: boolean;
  error?: string | null;
}

const initialState: PostsState = {
  posts: [],
  authors: {},
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.map((post: Post) => ({
          ...post,
          authorName: state.authors[post.userId] || "Author unknown",
        }));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        const { id } = action.meta.arg;
        state.posts.unshift({ ...action.payload, id });
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1)
          state.posts[index] = { ...state.posts[index], ...action.payload };
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.authors = action.payload;
        state.posts = state.posts.map((post) => ({
          ...post,
          authorName: action.payload[post.userId] || "Author unknown",
        }));
      });
  },
});

export default postsSlice.reducer;
