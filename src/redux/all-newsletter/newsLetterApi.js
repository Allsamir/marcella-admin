const { apiSlice } = require("../api/apiSlice");

const NewsLetterApi = apiSlice.injectEndpoints({
  tagTypes: ["NewsLetter"],
  endpoints: (builder) => ({
    // get all NewsLetter hook
    getAllNewsLetter: builder.query({
      query: (query) => ({
        url: `newsletter${query}`,
        method: "GET",
      }),
      providesTags: ["NewsLetter"],
    }),

    // get all NewsLetter hook
    deleteSingleNewsLetter: builder.mutation({
      query: (id) => ({
        url: `newsletter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NewsLetter"],
    }),
  }),
});

export const { useGetAllNewsLetterQuery, useDeleteSingleNewsLetterMutation } = NewsLetterApi;
