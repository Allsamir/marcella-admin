import { apiSlice } from "../api/apiSlice";

export const flatSaleDiscountApi = apiSlice.injectEndpoints({
  tagTypes: ["FlatSaleDiscount", "SingleFlatSaleDiscount"],
  endpoints: (builder) => ({
    // get all clearance sale discount for new user
    getFlatSaleDiscount: builder.query({
      query: () => ({
        url: `/flatSaleDiscount`,
        method: "GET",
      }),
      providesTags: ["FlatSaleDiscount"],
    }),

    // get single clearance discount  by id
    getSingleFlatSaleDiscount: builder.query({
      query: (id) => ({
        url: `/flatSaleDiscount/${id}`,
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      providesTags: ["SingleFlatSaleDiscount"],
    }),

    //add new  clearance sale discount
    addFlatSaleDiscount: builder.mutation({
      query: (data) => ({
        url: `/flatSaleDiscount`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FlatSaleDiscount"],
    }),

    // active clearance sale discount by id
    activeSingleFlatSaleDiscount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/flatSaleDiscount/active/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FlatSaleDiscount"],
    }),

    // in active clearance sale discount by id
    inActiveSingleFlatSaleDiscount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/flatSaleDiscount/inactive/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FlatSaleDiscount"],
    }),

    // update clearance sale discount by id
    updateSingleFlatSaleDiscount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/flatSaleDiscount/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FlatSaleDiscount"],
    }),

    // delete  clearance sale discount by id
    deleteSingleFlatSaleDiscountById: builder.mutation({
      query: (id) => ({
        url: `/flatSaleDiscount/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["FlatSaleDiscount", "SingleFlatSaleDiscount"],
    }),
  }),
});

export const {
  useGetFlatSaleDiscountQuery,
  useGetSingleFlatSaleDiscountQuery,
  useAddFlatSaleDiscountMutation,
  useUpdateSingleFlatSaleDiscountMutation,
  useDeleteSingleFlatSaleDiscountByIdMutation,
  useInActiveSingleFlatSaleDiscountMutation,
  useActiveSingleFlatSaleDiscountMutation,
} = flatSaleDiscountApi;
