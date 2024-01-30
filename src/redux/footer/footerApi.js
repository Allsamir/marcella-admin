/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const footerApi = apiSlice.injectEndpoints({
  tagTypes: ["AllFooter", "SingleFooter"],
  endpoints: (builder) => ({
    // get termsCondition offer discount for new user
    getAllFooter: builder.query({
      query: () => ({
        url: `/footer`,
        method: "GET",
      }),
      providesTags: ["AllFooter"],
    }),
    // get blog offer discount for new user
    getSingleFooter: builder.query({
      query: (id) => ({
        url: `/footer/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleFooter"],
    }),

    // get blog offer discount for new user
    addNewFooter: builder.mutation({
      query: (blog) => ({
        url: `/footer`,
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["AllFooter"],
    }),

    // get blog offer discount for new user
    updateSingleFooter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/footer/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllFooter", "SingleFooter"],
    }),

    // get blog offer discount for new user
    deleteSingleFooter: builder.mutation({
      query: (id) => ({
        url: `/footer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllFooter"],
    }),
  }),
});

export const {
  useGetAllFooterQuery,
  useGetSingleFooterQuery,
  useAddNewFooterMutation,
  useUpdateSingleFooterMutation,
  useDeleteSingleFooterMutation,
} = footerApi;
