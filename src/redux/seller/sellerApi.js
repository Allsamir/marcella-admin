import { apiSlice } from "../api/apiSlice";

export const sellerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //get single seller by id
        getSingleSellerById: builder.query({
            query: (id) => ({
                url: `/auth/client-seller/${id}`,
                method: "POST",
            }),
        }),

    }),
});

export const {
    useGetSingleSellerByIdQuery
} = sellerApi;
