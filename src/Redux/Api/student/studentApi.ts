import baseApi from "../baseApi";


const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudent: build.query({
      query: () => ({
        url: `/students`,
        method: "GET",
      }),
      providesTags: ["student"],

    }),
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
    }),
    storestudnet: build.mutation({
      query: ({id,data}) => ({
        url: `students/update/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to application/json
        },
        body: data,
      }),
      invalidatesTags: ["student"],
    }),
    getSingStudent: build.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      providesTags: ["student"],

    }),
  }),
});

export const { useGetStudentQuery,useDeleteStudentMutation,useStorestudnetMutation,useGetSingStudentQuery } = courseApi;
