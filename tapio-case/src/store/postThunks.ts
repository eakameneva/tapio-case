import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "./postDTO";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (page: number) => {
    const response = await fetch(`${BASE_URL}?_limit=6&_page=${page}`);
    const data = await response.json();
    return {
      posts: data,
      total: Number(response.headers.get("X-Total-Count")) || 100,
    };
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (newPost: Partial<Post>) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    return await response.json();
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: Post) => {
    const response = await fetch(`${BASE_URL}/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    return await response.json();
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return id;
  }
);
