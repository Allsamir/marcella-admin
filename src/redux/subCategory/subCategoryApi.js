import { apiSlice } from "../api/apiSlice";

export const subCategoryApi = apiSlice.injectEndpoints({
  tagTypes: ["SubCategory", "SingleSubCategory"],
  endpoints: (builder) => ({
    // get all subcategory
    getAllSubCategory: builder.query({
      query: () => ({
        url: `/subcategory`,
        method: "GET",
      }),
      providesTags: ["SubCategory"],
    }),
    // get all subcategory
    getFilterSubCategory: builder.query({
      query: (subCategory) => ({
        url: `/subcategory/filter?parent=${subCategory}`,
        method: "GET",
      }),
      providesTags: ["SubCategory"],
    }),

    // get single subcategory by id
    getSingleSubCategory: builder.query({
      query: (id) => ({
        url: `/subcategory/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["SubCategory"],
      providesTags: ["SingleSubCategory"],
    }),

    // add new subcategory
    addSubCategory: builder.mutation({
      query: (data) => ({
        url: `/subcategory`,
        method: "POST",
        body: data,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["SubCategory"],
    }),

    // update subcategory by id
    updateSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subcategory/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["SubCategory", "SingleSubCategory"],
    }),

    // delete subcategory by id
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/subcategory/${id}`,
        method: "DELETE",
        body: id,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useGetAllSubCategoryQuery,
  useGetFilterSubCategoryQuery,
  useDeleteSubCategoryMutation,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useGetSingleSubCategoryQuery,
} = subCategoryApi;
