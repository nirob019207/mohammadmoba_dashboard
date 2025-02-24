import baseApi from "../baseApi";


const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourse: build.query({
      query: () => ({
        url: `/courses`,
        method: "GET",
      }),
    }),
    deleteCourse: build.mutation({
      query: (id) => ({
        url: `/couses/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetCourseQuery,useDeleteCourseMutation } = courseApi;
