import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, IPost } from "./postDTO";
import makeRequest from "../api";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest("/posts");
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
  async (newPost: Partial<IPost>, { rejectWithValue }) => {
    try {
      const response = await makeRequest("/posts", "POST", newPost);

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
  async (post: IPost, { rejectWithValue }) => {
    if (post.id >= 1000000000000) {
      return post;
    }
    try {
      const response = await makeRequest(`/posts/${post.id}`, "PUT", post);

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
      const response = await makeRequest(`/posts/${id}`, "DELETE");
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

export const fetchAuthors = createAsyncThunk(
  "posts/fetchAuthors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest("/users");
      if (!response.ok) {
        throw new Error("Error fetching authors");
      }
      const users = await response.json();

      return users.reduce((acc: Record<number, string>, user: IUser) => {
        acc[user.id] = user.name;
        return acc;
      }, {});
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
