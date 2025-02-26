import baseApi from "../baseApi";


const mycourseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getmat: build.query({
      query: () => ({
        url: `/students/student/courses-with-materials`,
        method: "GET",
      }),
      providesTags:["mate"]
    }),
   
  }),
});

export const { useGetmatQuery } = mycourseApi;
