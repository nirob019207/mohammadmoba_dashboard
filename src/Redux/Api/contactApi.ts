import baseApi from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    contacts: build.query({
      query: ({ page, limit }) => ({
        url: `/contacts?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useContactsQuery } = contactApi;
