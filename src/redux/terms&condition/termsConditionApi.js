/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const termConditionApi = apiSlice.injectEndpoints({
  tagTypes: ["AlltermsCondition"],
  endpoints: (builder) => ({
    // get termsCondition offer discount for new user
    getAllTermsCondition: builder.query({
      query: () => ({
        url: `/termsCondition`,
        method: "GET",
      }),
      providesTags: ["AlltermsCondition"],
    }),
    // get blog offer discount for new user
    getSingleTermsCondition: builder.query({
      query: (id) => ({
        url: `/termsCondition/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["AlltermsCondition"],
    }),
    // get blog offer discount for new user
    addNewTermCondition: builder.mutation({
      query: (blog) => ({
        url: `/termsCondition`,
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["AlltermsCondition"],
    }),

    // get blog offer discount for new user
    updateSingleTermCondition: builder.mutation({
      query: ({ id, data }) => ({
        url: `/termsCondition/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AlltermsCondition"],
    }),

    // get blog offer discount for new user
    deleteSingleTermCondition: builder.mutation({
      query: (id) => ({
        url: `/termsCondition/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AlltermsCondition"],
    }),
  }),
});

export const {
  useGetAllTermsConditionQuery,
  useGetSingleTermsConditionQuery,
  useAddNewTermConditionMutation,
  useUpdateSingleTermConditionMutation,
  useDeleteSingleTermConditionMutation,
} = termConditionApi;
