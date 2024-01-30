/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const faqApi = apiSlice.injectEndpoints({
  tagTypes: ["AllFaq", "singleFaq"],
  endpoints: (builder) => ({
    // get faq offer discount for new user
    getAllFaq: builder.query({
      query: () => ({
        url: `/faq`,
        method: "GET",
      }),
      providesTags: ["AllFaq"],
    }),
    // get Faq offer discount for new user
    getSingleFaq: builder.query({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "GET",
      }),
      providesTags: ["singleFaq"],
    }),
    // get Faq offer discount for new user
    addNewFaq: builder.mutation({
      query: (faq) => ({
        url: `/faq`,
        method: "POST",
        body: faq,
      }),
      invalidatesTags: ["AllFaq"],
    }),

    // get Faq offer discount for new user
    updateSingleFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllFaq", "singleFaq"],
    }),

    // get Faq offer discount for new user
    deleteSingleFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllFaq"],
    }),
  }),
});

export const {
  useGetAllFaqQuery,
  useGetSingleFaqQuery,
  useAddNewFaqMutation,
  useUpdateSingleFaqMutation,
  useDeleteSingleFaqMutation,
} = faqApi;
