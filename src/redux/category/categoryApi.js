/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
    tagTypes: ["Category", "SingleCategory"],
    endpoints: (builder) => ({
        //get all  category
        getAllCategory: builder.query({
            query: () => ({
                url: `/category`,
                method: "GET",
            }),
            providesTags: ["Category"],
        }),

        //get single category by id
        getSingleCategory: builder.query({
            query: (id) => ({
                url: `/category/${id}`,
                method: "GET",
            }),
            invalidatesTags: ["Category"],
            providesTags: ["SingleCategory"],
        }),

        //add new category
        addCategory: builder.mutation({
            query: (data) => ({
                url: `/category`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),

        //update category by id
        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/category/${id}`,
                method: "PUT",
                body: data,
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
                },
            }),
            invalidatesTags: ["Category", "SingleCategory"],
        }),

        // deleteCategory by id
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: "DELETE",
                body: id,
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("auth")).accessToken,
                },
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const {
    useAddCategoryMutation,
    useGetAllCategoryQuery,
    useDeleteCategoryMutation,
    useGetSingleCategoryQuery,
    useUpdateCategoryMutation,
} = categoryApi;
