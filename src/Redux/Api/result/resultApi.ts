import baseApi from "../baseApi";


const resultApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResult: build.query({
      query: () => ({
        url: `/students/get/results`,
        method: "GET",
      }),
      providesTags:["result"]
    }),
   
  }),
});

export const { useGetResultQuery } = resultApi;
