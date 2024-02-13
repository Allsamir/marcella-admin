/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { adminLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/v1",
  // baseUrl: "http://192.168.0.224:8000/v1",
  // baseUrl: "https://server-marcella.onrender.com/v1",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // if net is disconnect then log out using  this string --> "FETCH_ERROR" => optional

    if (result?.error?.status === 401) {
      api.dispatch(adminLoggedOut());
    }

    return result;
  },

  tagTypes: ["Products"],
  endpoints: (builder) => ({}),
});
