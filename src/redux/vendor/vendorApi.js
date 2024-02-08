import { apiSlice } from "../api/apiSlice";

export const vendorApi = apiSlice.injectEndpoints({
    tagTypes: ["vendor"],
    endpoints: (builder) => ({
        //get all  vendors
        getAllSeller: builder.query({
            query: () => ({
                url: `/auth/seller`,
                method: "POST",
            }),
            providesTags: ["vendor"],
        }),
    }),
});


export const {
    useGetAllSellerQuery
} = vendorApi;