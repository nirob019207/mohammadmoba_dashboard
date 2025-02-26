import baseApi from "../baseApi";


const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourse: build.query({
      query: () => ({
        url: `/courses`,
        method: "GET",
      }),
      providesTags:["Course"]
    }),
    deleteCourse: build.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["Course"]
    }),

    storecourse: build.mutation({
      query: (data) => ({
        url: `/courses`,
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to application/json
        },
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const { useGetCourseQuery,useDeleteCourseMutation,useStorecourseMutation } = courseApi;
