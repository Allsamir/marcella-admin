/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const returnApi = apiSlice.injectEndpoints({
  tagTypes: ["AllReturns", "SingleReturn"],
  endpoints: (builder) => ({
    // get termsCondition offer discount for new user
    getAllReturns: builder.query({
      query: () => ({
        url: `/return`,
        method: "GET",
      }),
      providesTags: ["AllReturns"],
    }),
    // get blog offer discount for new user
    getSingleReturn: builder.query({
      query: (id) => ({
        url: `/return/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleReturn"],
    }),
    // get blog offer discount for new user
    addNewReturn: builder.mutation({
      query: (blog) => ({
        url: `/return`,
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["AllReturns"],
    }),

    // get blog offer discount for new user
    updateSingleReturn: builder.mutation({
      query: ({ id, data }) => ({
        url: `/return/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllReturns", "SingleReturn"],
    }),

    // get blog offer discount for new user
    deleteSingleReturn: builder.mutation({
      query: (id) => ({
        url: `/return/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllReturns"],
    }),
  }),
});

export const {
  useGetAllReturnsQuery,
  useGetSingleReturnQuery,
  useAddNewReturnMutation,
  useUpdateSingleReturnMutation,
  useDeleteSingleReturnMutation,
} = returnApi;
