import baseApi from "../baseApi";


const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudent: build.query({
      query: () => ({
        url: `/students`,
        method: "GET",
      }),
    }),
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetStudentQuery,useDeleteStudentMutation } = courseApi;
