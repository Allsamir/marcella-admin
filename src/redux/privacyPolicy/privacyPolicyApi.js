/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const privacyPolicyApi = apiSlice.injectEndpoints({
  tagTypes: ["AllPrivacy", 'SinglePrivacy'],
  endpoints: (builder) => ({
    // get termsCondition offer discount for new user
    getAllPrivacy: builder.query({
      query: () => ({
        url: `/privacy-policy`,
        method: "GET",
      }),
      providesTags: ["AllPrivacy"],
    }),
    // get blog offer discount for new user
    getSinglePrivacy: builder.query({
      query: (id) => ({
        url: `/privacy-policy/${id}`,
        method: "GET",
      }),
      providesTags: ["SinglePrivacy"],
    }),
    // get blog offer discount for new user
    addNewPrivacy: builder.mutation({
      query: (blog) => ({
        url: `/privacy-policy`,
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["AllPrivacy"],
    }),

    // get blog offer discount for new user
    updateSinglePrivacy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/privacy-policy/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllPrivacy", "SinglePrivacy"],
    }),

    // get blog offer discount for new user
    deleteSinglePrivacy: builder.mutation({
      query: (id) => ({
        url: `/privacy-policy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllPrivacy"],
    }),
  }),
});

export const {
  useGetAllPrivacyQuery,
  useGetSinglePrivacyQuery,
  useAddNewPrivacyMutation,
  useUpdateSinglePrivacyMutation,
  useDeleteSinglePrivacyMutation,
} = privacyPolicyApi;
