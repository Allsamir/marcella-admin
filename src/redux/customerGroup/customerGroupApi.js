import { apiSlice } from "../api/apiSlice";

export const customerGroupApi = apiSlice.injectEndpoints({
  tagTypes: ["AllGroup", "SingleGroup"],
  endpoints: (builder) => ({
    //get all  group
    getAllCustomerGroup: builder.query({
      query: () => ({
        url: `/group`,
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      providesTags: ["AllGroup"],
    }),

    //get single group by id
    getSingleCustomerGroup: builder.query({
      query: (id) => ({
        url: `/group/${id}`,
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["AllGroup"],
      providesTags: ["SingleGroup"],
    }),

    //add new group
    addCustomerGroup: builder.mutation({
      query: (data) => ({
        url: `/group/add`,
        method: "POST",
        body: data,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["AllGroup"],
    }),

    //update group by id
    updateSingleCustomerGroup: builder.mutation({
      query: ({ id, data }) => ({
        url: `/group/groupInformationUpdate/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["AllGroup", "SingleGroup"],
    }),

    // delete group by id
    deleteSingleCustomerGroup: builder.mutation({
      query: (id) => ({
        url: `/group/groupDelete/${id}`,
        method: "DELETE",
        body: id,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["AllGroup"],
    }),
  }),
});

export const {
  useGetAllCustomerGroupQuery,
  useDeleteSingleCustomerGroupMutation,
  useAddCustomerGroupMutation,
  useUpdateSingleCustomerGroupMutation,
  useGetSingleCustomerGroupQuery,
} = customerGroupApi;
