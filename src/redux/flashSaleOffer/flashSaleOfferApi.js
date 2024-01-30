import { apiSlice } from "../api/apiSlice";

export const FlashSaleOfferApi = apiSlice.injectEndpoints({
  tagTypes: ["FlashSaleOffer", "SingleFlashSaleOffer"],
  endpoints: (builder) => ({
    // get all clearance sale discount for new user
    getFlashSaleOffer: builder.query({
      query: () => ({
        url: `/flashSale-offer`,
        method: "GET",
      }),
      providesTags: ["FlashSaleOffer"],
    }),

    // get single clearance discount  by id
    getSingleFlashSaleOffer: builder.query({
      query: (id) => ({
        url: `/flashSale-offer/${id}`,
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      providesTags: ["SingleFlashSaleOffer"],
    }),

    //add new  clearance sale discount
    addFlashSaleOffer: builder.mutation({
      query: (data) => ({
        url: `/flashSale-offer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FlashSaleOffer"],
    }),

    // update clearance sale discount by id
    updateSingleFlashSaleOffer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/flashSale-offer/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FlashSaleOffer"],
    }),

    // delete  clearance sale discount by id
    deleteSingleFlashSaleOfferById: builder.mutation({
      query: (id) => ({
        url: `/flashSale-offer/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["FlashSaleOffer", "SingleFlashSaleOffer"],
    }),
  }),
});

export const {
  useGetFlashSaleOfferQuery,
  useGetSingleFlashSaleOfferQuery,
  useAddFlashSaleOfferMutation,
  useUpdateSingleFlashSaleOfferMutation,
  useDeleteSingleFlashSaleOfferByIdMutation,
} = FlashSaleOfferApi;
