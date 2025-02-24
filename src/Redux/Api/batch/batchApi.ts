import baseApi from "../baseApi";


const appliApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBatch: build.query({
      query: () => ({
        url: `/batches`,
        method: "GET",
      }),
    }),
    deleteBatch: build.mutation({
      query: (id) => ({
        url: `/batches/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetBatchQuery,useDeleteBatchMutation } = appliApi;
