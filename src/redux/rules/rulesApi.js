/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const rulseApi = apiSlice.injectEndpoints({
  tagTypes: ["Rules", "SingleRules"],
  endpoints: (builder) => ({
    //get all  Rules
    getAllRules: builder.query({
      query: () => ({
        url: `/rules`,
        method: "GET",
      }),
      providesTags: ["Rules"],
    }),

    //get single Rules by id
    getSingleRules: builder.query({
      query: (id) => ({
        url: `/rules/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Rules"],
      providesTags: ["SingleRules"],
    }),

    //add new Rules
    addRules: builder.mutation({
      query: (data) => ({
        url: `/rules`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Rules"],
    }),

    //update Rules by id
    updateRules: builder.mutation({
      query: ({ id, data }) => ({
        url: `/rules/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Rules", "SingleRules"],
    }),

    // deleteRules by id
    deleteRules: builder.mutation({
      query: (id) => ({
        url: `/Rules/${id}`,
        method: "DELETE",
        body: id,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["Rules"],
    }),
  }),
});

export const {
  useAddRulesMutation,
  useGetAllRulesQuery,
  useDeleteRulesMutation,
  useGetSingleRulesQuery,
  useUpdateRulesMutation,
} = rulseApi;
