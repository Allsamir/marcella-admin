/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const reportApi = apiSlice.injectEndpoints({
  tagTypes: ["AllReport", "SingleReport"],

  endpoints: (builder) => ({
    //get all reports
    getAllReports: builder.query({
      query: (query) => ({
        url: `/report${query}`,
        method: "GET",
      }),
      providesTags: ["AllReport"],
    }),

    //get single reports
    getSingleReport: builder.query({
      query: (id) => ({
        url: `/report/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleReport"],
    }),

    //get single reports
    updateSingleReport: builder.mutation({
      query: ({ id, data }) => ({
        url: `/report/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllReport", "SingleReport"],
    }),

    //get single reports
    deleteSingleReport: builder.mutation({
      query: (id) => ({
        url: `/report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllReport", "SingleReport"],
    }),
  }),
});

export const {
  useGetAllReportsQuery,
  useGetSingleReportQuery,
  useUpdateSingleReportMutation,
  useDeleteSingleReportMutation,
} = reportApi;
