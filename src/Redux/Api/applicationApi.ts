import baseApi from "./baseApi";

const appliApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    application: build.query({
      query: () => ({
        url: `/applications`,
        method: "GET",
      }),
      providesTags:["applications"]
    }),
    appApprove: build.mutation({
      query: ({ status, id }) => ({
        url: `/applications/${id}/approve-or-reject`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags:["applications"]


    }),
    
    appReject: build.mutation({
      query: ({ status, id }) => ({
        url: `/applications/${id}/approve-or-reject`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags:["applications"]
    }),
  }),
});

export const { useApplicationQuery,useAppApproveMutation,useAppRejectMutation } = appliApi;
