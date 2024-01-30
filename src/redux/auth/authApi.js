/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
import { apiSlice } from "../api/apiSlice";
import { adminLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ::::::::::::::::::: ADMIN LOGIN METHOD ::::::::::::::::::::
    login: builder.mutation({
      query: (data) => ({
        url: `/admin/login`,
        method: "POST",
        body: data,
      }),

      // when user loggedin then you set some info on localStorage and redux store
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result?.data?.token,
              email: result?.data?.email,
              role: result?.data?.role,
            }),
          );

          dispatch(
            adminLoggedIn({
              accessToken: result?.data?.token,
              email: result?.data?.email,
              role: result?.data?.role,
            }),
          );
        } catch (error) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
