/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const productTypeApi = apiSlice.injectEndpoints({
    tagTypes: ["AllProductType", "SingleProductType"],

    endpoints: (builder) => ({
        //get all product type
        getAllproductType: builder.query({
            query: () => ({
                url: `/product-type`,
                method: "GET",
            }),
            providesTags: ["AllProductType"],
        }),

        // add product type 
        addProductType: builder.mutation({
            query: ({ data }) => ({
                url: `/product-type`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AllProductType", "SingleProductType"],
        }),

        //get single product type
        getSingleProductType: builder.query({
            query: (id) => ({
                url: `/product-type/${id}`,
                method: "GET",
            }),
            providesTags: ["SingleProductType"],
        }),

        //get single product type
        updateSingleProductType: builder.mutation({
            query: ({ id, data }) => ({
                url: `/product-type/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["AllProductType", "SingleProductType"],
        }),

        //get single product type
        deleteSingleProductType: builder.mutation({
            query: (id) => ({
                url: `/product-type/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AllProductType", "SingleProductType"],
        }),
    }),
});

export const {
    useGetAllproductTypeQuery,
    useAddProductTypeMutation,
    useGetSingleProductTypeQuery,
    useUpdateSingleProductTypeMutation,
    useDeleteSingleProductTypeMutation,
} = productTypeApi;
