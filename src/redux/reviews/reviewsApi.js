const { apiSlice } = require("../api/apiSlice");

const reviewsApi = apiSlice.injectEndpoints({
  tagTypes: ["AllReview"],
  endpoints: (builder) => ({
    // get all reviews hook
    getAllReviews: builder.query({
      query: (query) => ({
        url: `review${query}`,
        method: "GET",
      }),
      providesTags: ["AllReview"],
    }),

    // get total reviews hook
    getTotalReviews: builder.query({
      query: () => ({
        url: "review/totalReviews",
        method: "GET",
      }),
    }),

    // get total reviews by month
    getTotalReviewsByMonth: builder.query({
      query: () => ({
        url: "review/totalReviewsByMonth",
        method: "GET",
      }),
    }),

    // get all reviews hook
    deleteSingleReview: builder.mutation({
      query: (id) => ({
        url: `review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllReview"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useDeleteSingleReviewMutation,
  useGetTotalReviewsQuery,
  useGetTotalReviewsByMonthQuery,
} = reviewsApi;
