/* eslint-disable prettier/prettier */
import { apiSlice } from "../api/apiSlice";

export const bannerApi = apiSlice.injectEndpoints({
  tagTypes: [
    "AllDesktopBanner",
    "AllRelatedBanner",
    "SingleRelatedBanner",
    "AllTopBanner",
    "SingleDesktopBanner",
    "BottomBanner",
    "SingleTopBanner",
    "SingleBottomBanner",
  ],
  endpoints: (builder) => ({
    //get all  desktopBanner
    getDesktopAllBanner: builder.query({
      query: () => ({
        url: `/desktopBanner`,
        method: "GET",
      }),
      providesTags: ["AllDesktopBanner"],
    }),

    //get all  desktopBanner
    getAllBannerName: builder.query({
      query: () => ({
        url: `/desktopBanner/allBannerName`,
        method: "GET",
      }),
    }),

    //get all  desktopBanner
    getSingleDesktopBanner: builder.query({
      query: (id) => ({
        url: `/desktopBanner/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleDesktopBanner"],
    }),
    //delete desktop banner
    deleteDesktopBanner: builder.mutation({
      query: (id) => ({
        url: `/desktopBanner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllDesktopBanner"],
    }),

    //add  desktop banner
    addDesktopBanner: builder.mutation({
      query: (formData) => ({
        url: `/desktopBanner`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AllDesktopBanner"],
    }),

    //add  desktop banner
    updateDesktopBanner: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/desktopBanner/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["SingleDesktopBanner", "AllDesktopBanner"],
    }),

    //:::::::::::::::::::::: Related banner ::::::::::::::::::::::::::

    //get category by id
    getRelatedAllBanner: builder.query({
      query: () => ({
        url: `/relatedBanner`,
        method: "GET",
      }),
      providesTags: ["AllRelatedBanner"],
    }),

    //get single top banner
    getRelatedBanner: builder.query({
      query: (id) => ({
        url: `/relatedBanner/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleRelatedBanner"],
    }),

    //delete desktop banner
    deleteRelatedBanner: builder.mutation({
      query: (id) => ({
        url: `/relatedBanner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllRelatedBanner"],
    }),

    //add  Related banner
    addRelatedBanner: builder.mutation({
      query: (formData) => ({
        url: `/relatedBanner`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AllRelatedBanner"],
    }),

    //update  related banner
    updateRelatedBanner: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/relatedBanner/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["SingleRelatedBanner", "AllRelatedBanner"],
    }),
    //:::::::::::::::::::::: top banner ::::::::::::::::::::::::::

    //get all top banner
    getSideAllBanner: builder.query({
      query: () => ({
        url: `/sideBanner`,
        method: "GET",
      }),
      providesTags: ["AllTopBanner"],
    }),

    //get single top banner
    getSideBanner: builder.query({
      query: (id) => ({
        url: `/sideBanner/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleTopBanner"],
    }),

    //update  top banner
    updateSideBanner: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/sideBanner/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["SingleTopBanner", "AllTopBanner"],
    }),

    //delete top banner
    deleteSideBanner: builder.mutation({
      query: (id) => ({
        url: `/sideBanner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllTopBanner"],
    }),

    //add  top banner
    addSideBanner: builder.mutation({
      query: (formData) => ({
        url: `/sideBanner`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AllTopBanner"],
    }),

    //:::::::::::::::::::::: bottom banner ::::::::::::::::::::::::::

    //get all bottom banner
    getBottomAllBanner: builder.query({
      query: () => ({
        url: `/bottomBanner`,
        method: "GET",
      }),
      providesTags: ["BottomBanner"],
    }),

    //get single bottom banner
    getSingleBottomBanner: builder.query({
      query: (id) => ({
        url: `/bottomBanner/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleBottomBanner"],
    }),

    //delete bottom banner
    deleteBottomBanner: builder.mutation({
      query: (id) => ({
        url: `/bottomBanner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BottomBanner"],
    }),

    //add  bottom banner
    addBottomBanner: builder.mutation({
      query: (formData) => ({
        url: `/bottomBanner`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["BottomBanner"],
    }),

    //update  bottom banner
    updateBottomBanner: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/bottomBanner/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["SingleBottomBanner", "BottomBanner"],
    }),
  }),
});

export const {
  // Desktop Banner :::::::::::::::
  useGetDesktopAllBannerQuery,
  useGetSingleDesktopBannerQuery,
  useDeleteDesktopBannerMutation,
  useAddDesktopBannerMutation,
  useUpdateDesktopBannerMutation,
  useGetAllBannerNameQuery,

  // Related banner ::::::::::::::::
  useGetRelatedAllBannerQuery,
  useGetRelatedBannerQuery,
  useDeleteRelatedBannerMutation,
  useUpdateRelatedBannerMutation,
  useAddRelatedBannerMutation,

  // top banner :::::::::::::::::
  useDeleteSideBannerMutation,
  useGetSideBannerQuery,
  useGetSideAllBannerQuery,
  useAddSideBannerMutation,
  useUpdateSideBannerMutation,

  // bottom banner :::::::::::::::
  useGetBottomAllBannerQuery,
  useGetSingleBottomBannerQuery,
  useDeleteBottomBannerMutation,
  useAddBottomBannerMutation,
  useUpdateBottomBannerMutation,
} = bannerApi;
