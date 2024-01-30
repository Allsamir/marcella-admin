/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const blogsApi = apiSlice.injectEndpoints({
  tagTypes: ["AllBlogs", "singleBlog"],
  endpoints: (builder) => ({
    // get blogs offer discount for new user
    getAllBlogs: builder.query({
      query: () => ({
        url: `/blogs`,
        method: "GET",
      }),
      providesTags: ["AllBlogs"],
    }),
    // get blog offer discount for new user
    getSingleBlogs: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["singleBlog"],
    }),
    // get blog offer discount for new user
    addNewBlog: builder.mutation({
      query: (formData) => ({
        url: `/blogs`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AllBlogs"],
    }),

    // get blog offer discount for new user
    updateSingleBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["AllBlogs", "singleBlog"],
    }),

    // get blog offer discount for new user
    deleteSingleBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllBlogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogsQuery,
  useAddNewBlogMutation,
  useUpdateSingleBlogMutation,
  useDeleteSingleBlogMutation,
} = blogsApi;
