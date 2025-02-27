import baseApi from "../baseApi";


const admin_professorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBatch: build.query({
      query: () => ({
        url: `/batches`,
        method: "GET",
      }),
      providesTags:["batch"]
    }),
    deleteBatch: build.mutation({
      query: (id) => ({
        url: `/batches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["batch"]
    }),

    storeProf: build.mutation({
      query: (data) => ({
        url: `/professors`,
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to application/json
        },
        body: data,
      }),
      invalidatesTags: ["Prof"],
    }),
    
    
    // updbatch: build.mutation({
    //   query: (data) => ({
    //     url: `/batches/${id}`,
    //     method: "POST",
    //     body:data

    //   }),
    //   invalidatesTags:["batch"]
    // }),
  }),
});

export const { useGetBatchQuery,useDeleteBatchMutation,useStoreProfMutation } = admin_professorApi;
