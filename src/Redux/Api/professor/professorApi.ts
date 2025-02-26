import baseApi from "../baseApi";

const professorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProfessor: build.query({
      query: () => ({
        url: `/professors`,
        method: "GET",
      }),
    }),

    getProfessorDetails: build.query({
      query: (id) => ({
        url: `/professors/${id}`,
        method: "GET",
      }),
    }),

    getProfessorsBatchStudents: build.query({
      query: (id) => ({
        url: `/professors/batch/${id}`,
        method: "GET",
      }),
    }),

    getProfessorDashboard: build.query({
      query: () => ({
        url: `/professors/get/batches`,
        method: "GET",
      }),
    }),
    getProfessorBatches: build.query({
      query: () => ({
        url: `/professors/get/batches`,
        method: "GET",
      }),
    }),
    deleteProfessor: build.mutation({
      query: (id) => ({
        url: `/professors/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProfessorQuery,
  useGetProfessorBatchesQuery,
  useGetProfessorDashboardQuery,
  useGetProfessorDetailsQuery,
  useGetProfessorsBatchStudentsQuery,
  useDeleteProfessorMutation,
} = professorApi;
