import { apiSlice } from "../api/apiSlice";

export const flashSaleTypesApi = apiSlice.injectEndpoints({
  tagTypes: ["AllTypes", "SingleTypes"],
  endpoints: (builder) => ({
    //get all  users
    getAllTypes: builder.query({
      query: () => ({
        url: `/flashSale-types`,
        method: "GET",
      }),
      providesTags: ["AllTypes"],
    }),

    //get single  users
    getSingleTypes: builder.query({
      query: (id) => ({
        url: `/flashSale-types/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleTypes"],
    }),

    // delete users by id
    deleteSingleTypes: builder.mutation({
      query: (id) => ({
        url: `/flashSale-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllTypes"],
    }),

    // delete users by id
    updateSingleTypes: builder.mutation({
      query: ({ id, data }) => ({
        url: `/flashSale-types/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllTypes", "SingleTypes"],
    }),
    // delete users by id
    addSingleTypes: builder.mutation({
      query: (data) => ({
        url: `/flashSale-types`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllTypes"],
    }),
  }),
});

export const {
  useGetAllTypesQuery,
  useGetSingleTypesQuery,
  useDeleteSingleTypesMutation,
  useAddSingleTypesMutation,
  useUpdateSingleTypesMutation,
} = flashSaleTypesApi;
