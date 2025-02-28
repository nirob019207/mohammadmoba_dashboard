import baseApi from "../baseApi";


const mycourseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getmat: build.query({
      query: (id) => ({
        url: `students/get/materials/${id}`,
        method: "GET",
      }),
      providesTags:["mate"]
    }),
    getstudentsCourse: build.query({
      query: (id) => ({
        url: `students/get/courses`,
        method: "GET",
      }),
      providesTags:["mate"]
    }),
  }),
});

export const { useGetmatQuery ,useGetstudentsCourseQuery} = mycourseApi;
