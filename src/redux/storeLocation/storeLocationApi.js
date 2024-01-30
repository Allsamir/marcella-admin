/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const storeLocationApi = apiSlice.injectEndpoints({
  tagTypes: ["AllStoreLocation", "singleStore"],
  endpoints: (builder) => ({
    // get termsCondition offer discount for new user
    getAllStoreLocation: builder.query({
      query: () => ({
        url: `/storeLocation`,
        method: "GET",
      }),
      providesTags: ["AllStoreLocation"],
    }),
    // get blog offer discount for new user
    getSingleStore: builder.query({
      query: (id) => ({
        url: `/storeLocation/${id}`,
        method: "GET",
      }),
      providesTags: ["singleStore"],
    }),
    // get blog offer discount for new user
    addNewStore: builder.mutation({
      query: (blog) => ({
        url: `/storeLocation`,
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["AllStoreLocation"],
    }),

    // get blog offer discount for new user
    updateSingleStore: builder.mutation({
      query: ({ id, data }) => ({
        url: `/storeLocation/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllStoreLocation", "singleStore"],
    }),

    // get blog offer discount for new user
    deleteSingleStore: builder.mutation({
      query: (id) => ({
        url: `/storeLocation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllStoreLocation"],
    }),
  }),
});

export const {
  useGetAllStoreLocationQuery,
  useGetSingleStoreQuery,
  useAddNewStoreMutation,
  useUpdateSingleStoreMutation,
  useDeleteSingleStoreMutation,
} = storeLocationApi;
