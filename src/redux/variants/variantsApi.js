import { apiSlice } from "../api/apiSlice";

export const variantApi = apiSlice.injectEndpoints({
  tagTypes: ["AllColor", "SingleColor", "AllColor", "SingleSize"],
  endpoints: (builder) => ({
    //get all  users
    getAllColor: builder.query({
      query: () => ({
        url: `/color`,
        method: "GET",
      }),
      providesTags: ["AllColor"],
    }),

    //get single  users
    getSingleColor: builder.query({
      query: (id) => ({
        url: `/color/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleColor"],
    }),

    // delete users by id
    deleteSingleColor: builder.mutation({
      query: (id) => ({
        url: `/color/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllColor"],
    }),

    // delete users by id
    updateSingleColor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/color/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllColor", "SingleColor"],
    }),
    // delete users by id
    addSingleColor: builder.mutation({
      query: (data) => ({
        url: `/color`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllColor"],
    }),

    //:::::::::::::::::::::::: size api :::::::::::::::::::::::::://
    getAllSize: builder.query({
      query: () => ({
        url: `/size`,
        method: "GET",
      }),
      providesTags: ["AllSize"],
    }),

    //get single  users
    getSingleSize: builder.query({
      query: (id) => ({
        url: `/size/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleSize"],
    }),

    // delete users by id
    deleteSingleSize: builder.mutation({
      query: (id) => ({
        url: `/size/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllSize"],
    }),

    // delete users by id
    updateSingleSize: builder.mutation({
      query: ({ id, data }) => ({
        url: `/size/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllSize", "SingleSize"],
    }),
    // delete users by id
    addSingleSize: builder.mutation({
      query: (data) => ({
        url: `/size`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllSize"],
    }),
  }),
});

export const {
  useGetAllColorQuery,
  useGetSingleColorQuery,
  useDeleteSingleColorMutation,
  useAddSingleColorMutation,
  useUpdateSingleColorMutation,

  useGetAllSizeQuery,
  useGetSingleSizeQuery,
  useDeleteSingleSizeMutation,
  useAddSingleSizeMutation,
  useUpdateSingleSizeMutation,
} = variantApi;
