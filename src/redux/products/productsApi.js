/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  tagsTypes: [ "SingleProduct", "LowProducts", "FlashProducts"],
  endpoints: (builder) => ({
    //get all products here
    getAllProduct: builder.query({
      query: (queryUrl) => ({
        url: `/product${queryUrl}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // get all flash product
    getAllFlashProduct: builder.query({
      query: (queryUrl) => ({
        url: `/product/flashProduct${queryUrl}`,
        method: "GET",
      }),
      providesTags: ["FlashProducts"],
    }),
    //get all products here
    getAllLowQuantityProduct: builder.query({
      query: () => ({
        url: `/product/low-quantity`,
        method: "GET",
      }),
      providesTags: ["LowProducts"],
    }),

    //add product
    addSingleProduct: builder.mutation({
      query: (formData) => ({
        url: `/product`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products", "LowProducts", "FlashProducts"],
    }),

    //delete product
    deleteSingleProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["Products", "LowProducts", "FlashProducts"],
    }),

    // update product
    updateSingleProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products", "SingleProduct", "LowProducts", "FlashProducts"],
    }),

    // get single product details
    getSingleProductDetails: builder.query({
      query: (id) => ({
        url: `/product/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleProduct"],
    }),
  }),
});

export const {
  useAddSingleProductMutation,
  useDeleteSingleProductMutation,
  useGetAllProductQuery,
  useGetAllLowQuantityProductQuery,
  useGetSingleProductDetailsQuery,
  useUpdateSingleProductMutation,
  useGetAllFlashProductQuery,
} = productApi;
