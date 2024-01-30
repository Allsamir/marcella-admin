/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const shippingApi = apiSlice.injectEndpoints({
    tagTypes: ["AllShipping", "SingleShipping"],
    endpoints: (builder) => ({
        //get all  shipping
        getAllShipping: builder.query({
            query: () => ({
                url: `/shippingPrice`,
                method: "GET",
            }),
            providesTags: ["AllShipping"],
        }),

        //get single shipping by id
        getSingleShipping: builder.query({
            query: (id) => ({
                url: `/shippingPrice/${id}`,
                method: "GET",
            }),
            invalidatesTags: ["AllShipping"],
            providesTags: ["SingleShipping"],
        }),

        // create single shipping
        addSingleShipping: builder.mutation({
            query: (data) => ({
                url: `/shippingPrice`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AllShipping", "SingleShipping"],
        }),

        // update single shipping
        updateSingleShipping: builder.mutation({
            query: ({ id, data }) => ({
                url: `/shippingPrice/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["AllShipping", "SingleShipping"],
        }),

        // delete shipping by id
        deleteShippingById: builder.mutation({
            query: (id) => ({
                url: `/shippingPrice/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["AllShipping"],
        }),
    }),
});

export const {
    useGetAllShippingQuery,
    useDeleteShippingByIdMutation,
    useUpdateSingleShippingMutation,
    useGetSingleShippingQuery,
    useAddSingleShippingMutation,
} = shippingApi;
