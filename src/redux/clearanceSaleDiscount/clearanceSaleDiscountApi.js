import { apiSlice } from "../api/apiSlice";

export const clearanceSaleDiscountApi = apiSlice.injectEndpoints({
  tagTypes: ["ClearanceSaleDiscount", "SingleClearanceSaleDiscount"],
  endpoints: (builder) => ({
    // get all clearance sale discount for new user
    getClearanceSaleDiscount: builder.query({
      query: () => ({
        url: `/clearanceSaleOffer`,
        method: "GET",
      }),
      providesTags: ["ClearanceSaleDiscount"],
    }),

    // get single clearance discount  by id
    getSingleClearanceSaleDiscount: builder.query({
      query: (id) => ({
        url: `/clearanceSaleOffer/${id}`,
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      providesTags: ["SingleClearanceSaleDiscount"],
    }),

    //add new  clearance sale discount
    addClearanceSaleDiscount: builder.mutation({
      query: (data) => ({
        url: `/clearanceSaleOffer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ClearanceSaleDiscount"],
    }),

    // active clearance sale discount by id
    activeSingleClearanceSaleDiscount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/clearanceSaleOffer/active/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ClearanceSaleDiscount"],
    }),

    // in active clearance sale discount by id
    inActiveSingleClearanceSaleDiscount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/clearanceSaleOffer/inactive/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ClearanceSaleDiscount"],
    }),

    // update clearance sale discount by id
    updateSingleClearanceSaleDiscount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/clearanceSaleOffer/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ClearanceSaleDiscount"],
    }),

    // delete  clearance sale discount by id
    deleteSingleClearanceDiscountById: builder.mutation({
      query: (id) => ({
        url: `/clearanceSaleOffer/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["ClearanceSaleDiscount", "SingleClearanceSaleDiscount"],
    }),
  }),
});

export const {
  useGetClearanceSaleDiscountQuery,
  useGetSingleClearanceSaleDiscountQuery,
  useAddClearanceSaleDiscountMutation,
  useUpdateSingleClearanceSaleDiscountMutation,
  useDeleteSingleClearanceDiscountByIdMutation,
  useActiveSingleClearanceSaleDiscountMutation,
  useInActiveSingleClearanceSaleDiscountMutation,
} = clearanceSaleDiscountApi;
