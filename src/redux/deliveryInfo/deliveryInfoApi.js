/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const deliverInfoApi = apiSlice.injectEndpoints({
  tagTypes: ["AllDeliverInfo", 'singleInfo'],
  endpoints: (builder) => ({
    // get termsCondition offer discount for new user
    getAllDeliverInfo: builder.query({
      query: () => ({
        url: `/deliveryInfo`,
        method: "GET",
      }),
      providesTags: ["AllDeliverInfo"],
    }),
    // get blog offer discount for new user
    getSingleDeliveryInfo: builder.query({
      query: (id) => ({
        url: `/deliveryInfo/${id}`,
        method: "GET",
      }),
      providesTags: ["singleInfo"],
    }),
    // get blog offer discount for new user
    addNewDeliveryInfo: builder.mutation({
      query: (blog) => ({
        url: `/deliveryInfo`,
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["AllDeliverInfo"],
    }),

    // get blog offer discount for new user
    updateSingleDeliveryInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/deliveryInfo/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllDeliverInfo", "singleInfo"],
    }),

    // get blog offer discount for new user
    deleteSingleDeliveryInfo: builder.mutation({
      query: (id) => ({
        url: `/deliveryInfo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllDeliverInfo"],
    }),
  }),
});

export const {
  useGetAllDeliverInfoQuery,
  useGetSingleDeliveryInfoQuery,
  useAddNewDeliveryInfoMutation,
  useUpdateSingleDeliveryInfoMutation,
  useDeleteSingleDeliveryInfoMutation,
} = deliverInfoApi;
