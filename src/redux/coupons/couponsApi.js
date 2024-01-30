import { apiSlice } from "../api/apiSlice";

export const manufactureApi = apiSlice.injectEndpoints({
  tagTypes: ["AllCoupons", "SingleCoupon"],
  endpoints: (builder) => ({
    // get all category
    getAllCoupons: builder.query({
      query: () => ({
        url: `/coupon`,
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      providesTags: ["AllCoupons"],
    }),

    // get single category by id
    getSingleCoupon: builder.query({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["AllCoupons"],
      providesTags: ["SingleCoupon"],
    }),

    // add new coupon
    addSingleCouponById: builder.mutation({
      query: (data) => ({
        url: `/coupon/add`,
        method: "POST",
        body: data,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["AllCoupons"],
    }),

    // update coupon by id
    updateSingleCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coupon/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllCoupons", "SingleCoupon"],
    }),

    // delete coupon by id
    deleteSingleCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
        body: id,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["AllCoupons"],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useDeleteSingleCouponMutation,
  useAddSingleCouponByIdMutation,
  useUpdateSingleCouponMutation,
  useGetSingleCouponQuery,
} = manufactureApi;
