import { apiSlice } from "../api/apiSlice";

export const brandOfferDiscountApi = apiSlice.injectEndpoints({
  tagTypes: ["BrandOfferDiscount", "SingleBrandOfferDiscount"],
  endpoints: (builder) => ({
    // get allbrand offer discount for new user
    getBrandOfferDiscount: builder.query({
      query: () => ({
        url: `/brandOffer`,
        method: "GET",
      }),
      providesTags: ["BrandOfferDiscount"],
    }),

    // get single clearance discount  by id
    getSingleBrandOfferDiscount: builder.query({
      query: (id) => ({
        url: `/brandOffer/${id}`,
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      providesTags: ["SingleBrandOfferDiscount"],
    }),

    //add new brand offer discount
    addBrandOfferDiscount: builder.mutation({
      query: (data) => ({
        url: `/brandOffer/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BrandOfferDiscount"],
    }),

    // active brand offer discount by id
    activeSingleBrandOffer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brandOffer/active/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["BrandOfferDiscount"],
    }),

    // in active brand offer discount by id
    inActiveSingleBrandOffer: builder.mutation({
      query: ({ id, offer }) => ({
        url: `/brandOffer/inactive/${id}`,
        method: "PUT",
        body: offer,
      }),
      invalidatesTags: ["BrandOfferDiscount"],
    }),

    // update brand offer discount by id
    updateSingleBrandOfferDiscount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brandOffer/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["BrandOfferDiscount"],
    }),

    // delete brand offer discount by id
    deleteSingleBrandOfferDiscountById: builder.mutation({
      query: (id) => ({
        url: `/brandOffer/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["BrandOfferDiscount", "SingleBrandOfferDiscount"],
    }),
  }),
});

export const {
  useGetBrandOfferDiscountQuery,
  useGetSingleBrandOfferDiscountQuery,
  useAddBrandOfferDiscountMutation,
  useInActiveSingleBrandOfferMutation,
  useActiveSingleBrandOfferMutation,
  useUpdateSingleBrandOfferDiscountMutation,
  useDeleteSingleBrandOfferDiscountByIdMutation,
} = brandOfferDiscountApi;
