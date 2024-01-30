import { apiSlice } from "../api/apiSlice";

export const categoryWiseDiscountApi = apiSlice.injectEndpoints({
  tagTypes: ["CategoryWiseDiscount", "SingleCategoryWiseDiscount"],
  endpoints: (builder) => ({
    // get all categoryWise sale discount for new user
    getCategoryWiseDiscount: builder.query({
      query: () => ({
        url: `/categoryWiseDiscount`,
        method: "GET",
      }),
      providesTags: ["CategoryWiseDiscount"],
    }),

    // get single categoryWise discount  by id
    getSingleCategoryWiseDiscount: builder.query({
      query: (id) => ({
        url: `/categoryWiseDiscount/${id}`,
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      providesTags: ["SingleCategoryWiseDiscount"],
    }),

    //add new  categoryWise sale discount
    addCategoryWiseDiscount: builder.mutation({
      query: (data) => ({
        url: `/categoryWiseDiscount`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CategoryWiseDiscount"],
    }),

    // active categoryWise sale discount by id
    activeSingleCategoryWiseDiscount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categoryWiseDiscount/active/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CategoryWiseDiscount"],
    }),

    // in-active categoryWise sale discount by id
    inActiveSingleCategoryWiseDiscount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categoryWiseDiscount/inactive/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CategoryWiseDiscount"],
    }),

    // update categoryWise sale discount by id
    updateSingleCategoryWiseDiscount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categoryWiseDiscount/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CategoryWiseDiscount"],
    }),

    // delete  categoryWise sale discount by id
    deleteSingleCategoryDiscountById: builder.mutation({
      query: (id) => ({
        url: `/categoryWiseDiscount/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["CategoryWiseDiscount", "SingleCategoryWiseDiscount"],
    }),
  }),
});

export const {
  useGetCategoryWiseDiscountQuery,
  useGetSingleCategoryWiseDiscountQuery,
  useAddCategoryWiseDiscountMutation,
  useUpdateSingleCategoryWiseDiscountMutation,
  useDeleteSingleCategoryDiscountByIdMutation,
  useActiveSingleCategoryWiseDiscountMutation,
  useInActiveSingleCategoryWiseDiscountMutation,
} = categoryWiseDiscountApi;
