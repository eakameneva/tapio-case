import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "./postDTO";

export const postsApi = createApi({
  reducerPath: "postsApi",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://jsonplaceholder.typicode.com`,
  }),
  endpoints: (build) => ({
    getAllPosts: build.query<
      { posts: Post[]; total: number },
      { page: number }
    >({
      query: ({ page }) => ({
        url: "/posts",
        params: { _limit: 6, _page: page },
      }),
      transformResponse: (response: Post[], meta) => ({
        posts: response,
        total: Number(meta?.response?.headers.get("X-Total-Count")) || 100,
      }),
      providesTags: ["Post"],
    }),
    getOnePost: build.query<Post, number>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
      providesTags: ["Post"],
    }),
    addPost: build.mutation<Partial<Post>, unknown>({
      query: ({ body }) => ({
        url: "/posts",
        method: "POST",
        body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: build.mutation<Partial<Post>, unknown>({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: build.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
export const {
  useDeletePostMutation,
  useAddPostMutation,
  useUpdatePostMutation,
  useGetAllPostsQuery,
  useGetOnePostQuery,
} = postsApi;
