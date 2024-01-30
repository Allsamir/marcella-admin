const { apiSlice } = require("../api/apiSlice");

const mailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMail: builder.mutation({
      query: (data) => ({
        url: "mail/send",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendMailMutation } = mailApi;
