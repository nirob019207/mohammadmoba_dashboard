import baseApi from "../baseApi";


const professorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProffesor: build.query({
      query: () => ({
        url: `/professors`,
        method: "GET",
      }),
      providesTags:["professor"]
    }),
    deleteprofesor: build.mutation({
      query: (id) => ({
        url: `/professors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["batch"]
    }),
    storebatch: build.mutation({
      query: (data) => ({
        url: `/batches`,
        method: "POST",
        body:data
        
      }),
      invalidatesTags:["batch"]
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

export const { useGetProffesorQuery } = professorApi;
