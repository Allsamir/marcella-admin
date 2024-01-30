import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  tagTypes: ["AllUsers", "SingleUsers"],
  endpoints: (builder) => ({
    //get all  users
    getAllUsers: builder.query({
      query: (query) => ({
        url: `/user/all${query}`,
        method: "GET",
      }),
      providesTags: ["AllUsers"],
    }),

    //get all  users by month
    getTotalUsersByMonth: builder.query({
      query: () => ({
        url: `/user/totalUsersByMonth`,
        method: "GET",
      }),
    }),

    //get single  users
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleUsers"],
    }),

    //get all  users
    getTotalCustomers: builder.query({
      query: () => ({
        url: `/user/totalUsers`,
        method: "GET",
      }),
      providesTags: ["AllUsers"],
    }),

    // update users by id
    assignUserGroup: builder.mutation({
      query: (data) => ({
        url: `/group/assigningToGroup`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllUsers", "SingleUsers"],
    }),

    // delete users by id
    deleteSingleUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
        body: id,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["AllUsers"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetTotalUsersByMonthQuery,
  useGetSingleUserQuery,
  useAssignUserGroupMutation,
  useDeleteSingleUserMutation,
  useGetTotalCustomersQuery,
} = usersApi;
