import baseApi from "./baseApi";

const appliApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    application: build.query({
      query: () => ({
        url: `/applications`,
        method: "GET",
      }),
    }),
  }),
});

export const { useApplicationQuery } = appliApi;
