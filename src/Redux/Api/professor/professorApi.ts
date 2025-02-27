import baseApi from "../baseApi";

const professorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProfessor: build.query({
      query: () => ({
        url: `/professors`,
        method: "GET",
      }),
    }),

    getAllMaterials: build.query({
      query: () => ({
        url: `/materials`,
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
        url: `/professors/get/students-with-results`,
        method: "GET",
      }),
    }),

    getMaterialsByCourseId: build.query({
      query: (id: string) => ({
        url: `/materials/${id}`,
        method: "GET",
      }),
    }),

    deleteProfessor: build.mutation({
      query: (id) => ({
        url: `/professors/${id}`,
        method: "DELETE",
      }),
    }),

    deleteMaterials: build.mutation({
      query: (id) => ({
        url: `/materials/${id}`,
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
  useGetAllMaterialsQuery,
  useDeleteMaterialsMutation,
  useGetMaterialsByCourseIdQuery,
} = professorApi;
