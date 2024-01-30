/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  tagTypes: ["AllOrder", "SingleOrder", "RecentOrder", "AllFilterOrder"],
  endpoints: (builder) => ({
    //get all orders
    getAllOrders: builder.query({
      query: (query) => ({
        url: `/order${query}`,
        method: "GET",
      }),
      providesTags: ["AllOrder"],
    }),

    //get all orders
    getAllOrdersByFilter: builder.query({
      query: (query) => ({
        url: `/order/filterOrder?${query}`,
        method: "GET",
      }),
      providesTags: ["AllFilterOrder"],
    }),

    //get recent orders
    getRecentOrder: builder.query({
      query: () => ({
        url: `/order/recentOrder`,
        method: "GET",
      }),
      providesTags: ["RecentOrder"],
    }),

    //get all sale by year
    getTotalSaleByYear: builder.query({
      query: () => ({
        url: `/order/totalSaleByYear`,
        method: "GET",
      }),
    }),

    //get all orders by year
    getTotalOrdersByYear: builder.query({
      query: () => ({
        url: `/order/totalOrdersByYear`,
        method: "GET",
      }),
    }),

    //get all sale by month
    getTotalSaleByMonth: builder.query({
      query: () => ({
        url: `/order/totalSaleByMonth`,
        method: "GET",
      }),
    }),

    //get orders by day
    getTotalOrderByMonth: builder.query({
      query: () => ({
        url: `/order/totalOrdersByMonth`,
        method: "GET",
      }),
    }),

    //get all sale by day
    getTotalSaleByDay: builder.query({
      query: () => ({
        url: `/order/totalSaleByDay`,
        method: "GET",
      }),
    }),

    //get all order by day
    getTotalOrderByDay: builder.query({
      query: () => ({
        url: `/order/totalOrdersByDay`,
        method: "GET",
      }),
    }),

    //get total sales
    getTotalSales: builder.query({
      query: () => ({
        url: `/order/totalSales`,
        method: "GET",
      }),
    }),

    //get total sales
    getTotalSalesByDate: builder.mutation({
      query: ({ data }) => ({
        url: `/order/totalSales/byDate`,
        method: "POST",
        body: data,
      }),
    }),

    //get all sale by day
    getTotalOrders: builder.query({
      query: () => ({
        url: `/order/totalOrders`,
        method: "GET",
      }),
    }),

    // get single order by id
    getSingleOrderById: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      // invalidatesTags: ["AllOrder"],
      providesTags: ["SingleOrder"],
    }),

    // update order by id
    updateSingleOrderById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllOrder", "SingleOrder", "RecentOrder", "AllFilterOrder", "Products"],
    }),

    // delete order by id
    deleteOrderById: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["AllOrder", "AllFilterOrder"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetAllOrdersByFilterQuery,
  useGetRecentOrderQuery,
  useDeleteOrderByIdMutation,
  useUpdateSingleOrderByIdMutation,
  useGetSingleOrderByIdQuery,
  useGetTotalSaleByYearQuery,
  useGetTotalSaleByMonthQuery,
  useGetTotalOrderByMonthQuery,
  useGetTotalSaleByDayQuery,
  useGetTotalOrderByDayQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateMutation,
  useGetTotalOrdersQuery,
  useGetTotalOrdersByYearQuery,
} = orderApi;
