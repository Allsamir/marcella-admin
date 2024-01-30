import { apiSlice } from "../api/apiSlice";

export const manufactureApi = apiSlice.injectEndpoints({
  tagTypes: ["Manufacture", "SingleManufacture"],
  endpoints: (builder) => ({
    // get all manufacturer
    getAllManufacture: builder.query({
      query: () => ({
        url: `/manufacturer`,
        method: "GET",
      }),
      providesTags: ["Manufacture"],
    }),

    // get single manufacturer by id
    getSingleManufacture: builder.query({
      query: (id) => ({
        url: `/manufacturer/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Manufacture"],
      providesTags: ["SingleManufacture"],
    }),

    // add new manufacturer
    addManufacture: builder.mutation({
      query: (data) => ({
        url: `/manufacturer`,
        method: "POST",
        body: data,

      }),
      invalidatesTags: ["Manufacture"],
    }),

    // update manufacturer by id
    updateManufacture: builder.mutation({
      query: ({ id, data }) => ({
        url: `/manufacturer/${id}`,
        method: "PUT",
        body: data,

      }),
      invalidatesTags: ["Manufacture", "SingleManufacture"],
    }),

    // delete manufacturer by id
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/manufacturer/${id}`,
        method: "DELETE",
        body: id,

      }),
      invalidatesTags: ["Manufacture"],
    }),
  }),
});

export const {
  useGetAllManufactureQuery,
  useDeleteBrandMutation,
  useAddManufactureMutation,
  useUpdateManufactureMutation,
  useGetSingleManufactureQuery,
} = manufactureApi;
