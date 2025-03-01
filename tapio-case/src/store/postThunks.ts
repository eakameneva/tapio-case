import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "./postDTO";
import makeRequest from "../api";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest("/");
      if (!response.ok) {
        throw new Error("Error fetching posts");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (newPost: Partial<Post>, { rejectWithValue }) => {
    try {
      const response = await makeRequest("/", "POST", newPost);

      if (!response.ok) {
        throw new Error("Error creating post");
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: Post, { rejectWithValue }) => {
    try {
      const response = await makeRequest(`/${post.id}`, "PUT", post);

      if (!response.ok) {
        throw new Error("Error editing post");
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await makeRequest(`/${id}`, "DELETE");
      if (!response.ok) {
        throw new Error("Error deleting post");
      }
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
