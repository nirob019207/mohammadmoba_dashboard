import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
    overrideExisting: true, // This allows overriding existing endpoints

    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (data: any) => {
                return {
                    url: "/login",
                    method: "POST",
                    body: data
                }
            },

            invalidatesTags: ["logIn",]
        }),
      

        forgotUser: build.mutation({
            query: (data: any) => {
                return {
                    url: "/forgot-password",
                    method: "POST",
                    body: data
                }
            },

        }),
        otpUser: build.mutation({
            query: (data: any) => {
                return {
                    url: "/verify-otp",
                    method: "POST",
                    body: data
                }
            },

        }),
        resetPass: build.mutation({
            query: (data: any) => {
                return {
                    url: "/reset-password",
                    method: "POST",
                    body: data
                }
            },

        }),
      
     
     
       
        changePassword: build.mutation({
            query: (data: any) => {
                return {
                    url: "/auth/change-password",
                    method: "PUT",
                    body: data
                }
            },

        }),
        dashboardData: build.query({
            query: () => {
                return {
                    url: "/dashboard",
                    method: "GET",
                 
                }
            },

        }),

    
        

       
    }),
})


export const { useLoginUserMutation, useForgotUserMutation, useOtpUserMutation, useResetPassMutation,useDashboardDataQuery} = userApi