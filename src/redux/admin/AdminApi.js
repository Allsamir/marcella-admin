/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  tagTypes: ["AllAdmin", "SingleAdmin", "AllManager"],
  endpoints: (builder) => ({
    //GET ALL ADMIN
    getAllAdmins: builder.query({
      query: () => ({
        url: `/admin/allAdmin`,
        method: "GET",
      }),
      providesTags: ["AllAdmin"],
    }),

    // GET SINGLE ADMIN
    getSingleAdmin: builder.query({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleAdmin"],
    }),

    //TODO: CREATE ADMIN
    createNewAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SingleAdmin"],
    }),

    // // ADMIN PASSWORD CHANGE
    changeAdminPassword: builder.mutation({
      query: ({ email, data }) => ({
        url: `/admin/changeAdminPassword/${email}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SingleAdmin"],
    }),

    // AN  ADMIN DELETE
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/deleteAdmin/${id}`, // here id is a email address
        method: "DELETE",
      }),
      invalidatesTags: ["AllAdmin"],
    }),

    // GET SINGLE ADMIN
    getAllManager: builder.query({
      query: () => ({
        url: `/admin/manager/all`,
        method: "GET",
      }),
      providesTags: ["AllManager"],
    }),

    // Add manager
    addManager: builder.mutation({
      query: (data) => ({
        url: `/admin/manger`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllManager"],
    }),

    // Update manager
    updateManager: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/updateAndPasswordChange/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllManager", "SingleAdmin"],
    }),

    // AN  ADMIN DELETE
    deleteManager: builder.mutation({
      query: ({ id, currentUserEmail }) => ({
        url: `/admin/manager/${id}`,
        method: "DELETE",
        body: { currentUserEmail },
      }),
      invalidatesTags: ["AllManager"],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,//
  useGetSingleAdminQuery,//
  useCreateNewAdminMutation,//
  useDeleteAdminMutation,//
  useGetAllManagerQuery,//
  useAddManagerMutation,//
  useDeleteManagerMutation,//
  useUpdateManagerMutation,
  useChangeAdminPasswordMutation,//
} = adminApi;
