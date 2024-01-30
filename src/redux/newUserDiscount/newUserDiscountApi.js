import { apiSlice } from "../api/apiSlice";

export const newUserDiscountApi = apiSlice.injectEndpoints({
  tagTypes: ["AllNewUserDiscount", "singleDiscount"],
  endpoints: (builder) => ({
    // get all discount for new user
    getAllNewUserDiscount: builder.query({
      query: () => ({
        url: `/newUserDiscount`,
        method: "GET",
      }),
      providesTags: ["AllNewUserDiscount"],
    }),

    // get single order by id
    getSingleNewUserDiscountById: builder.query({
      query: (id) => ({
        url: `/newUserDiscount/${id}`,
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      providesTags: ["singleDiscount"],
    }),

    //add new discount
    addNewCustomerDiscount: builder.mutation({
      query: (data) => ({
        url: `/newUserDiscount`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllNewUserDiscount"],
    }),

    // update new user discount by id
    updateSingleNewUserDiscountById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/newUserDiscount/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllNewUserDiscount"],
    }),

    // delete new user discount by id
    deleteSingleNewUserDiscountById: builder.mutation({
      query: (id) => ({
        url: `/newUserDiscount/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["AllNewUserDiscount", "singleDiscount"],
    }),
  }),
});

export const {
  useGetAllNewUserDiscountQuery,
  useGetSingleNewUserDiscountByIdQuery,
  useAddNewCustomerDiscountMutation,
  useUpdateSingleNewUserDiscountByIdMutation,
  useDeleteSingleNewUserDiscountByIdMutation,
} = newUserDiscountApi;
