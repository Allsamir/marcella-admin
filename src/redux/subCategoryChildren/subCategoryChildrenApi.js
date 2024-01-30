import { apiSlice } from "../api/apiSlice";

export const subCategoryChildrenApi = apiSlice.injectEndpoints({
  tagTypes: ["SubCategoryChildren", "SingleSubCategoryChildren", "SubCategoryChildLimit"],
  endpoints: (builder) => ({
    // get all subcategory children
    getAllSubCategoryChildren: builder.query({
      query: () => ({
        url: `/subcategory-children`,
        method: "GET",
      }),
      providesTags: ["SubCategoryChildren"],
    }),

    // get all subcategory children
    getFilterSubCategoryChildren: builder.query({
      query: (selectedSubCategory) => ({
        url: `/subcategory-children/filter?parent=${selectedSubCategory}`,
        method: "GET",
      }),
      providesTags: ["SubCategoryChildren"],
    }),

    // get all subcategory children
    getAllSubCategoryChildrenByPage: builder.query({
      query: (page) => ({
        url: `/subcategory-children/limit${page}`,
        method: "GET",
      }),
      providesTags: ["SubCategoryChildLimit"],
    }),

    // get single subcategory children by id
    getSingleSubCategoryChildren: builder.query({
      query: (id) => ({
        url: `/subcategory-children/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleSubCategoryChildren"],
    }),

    // add new subcategory child
    addSubCategoryChildren: builder.mutation({
      query: (data) => ({
        url: `/subcategory-children`,
        method: "POST",
        body: data,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["SubCategoryChildLimit"],
    }),

    // update subcategory child by id
    updateSubCategoryChildren: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subcategory-children/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: [
        "SubCategoryChildren",
        "SingleSubCategoryChildren",
        "SubCategoryChildLimit",
      ],
    }),

    // delete subcategory child by id
    deleteSubCategoryChildren: builder.mutation({
      query: (id) => ({
        url: `/subcategory-children/${id}`,
        method: "DELETE",
        body: id,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
        },
      }),
      invalidatesTags: ["SubCategoryChildLimit"],
    }),
  }),
});

export const {
  useGetAllSubCategoryChildrenQuery,
  useGetFilterSubCategoryChildrenQuery,
  useGetAllSubCategoryChildrenByPageQuery,
  useDeleteSubCategoryChildrenMutation,
  useAddSubCategoryChildrenMutation,
  useUpdateSubCategoryChildrenMutation,
  useGetSingleSubCategoryChildrenQuery,
} = subCategoryChildrenApi;
