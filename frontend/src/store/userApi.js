import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/auth',
        credentials: 'include',
    }),

    endpoints: (builder) => ({

        register: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data
            })
        })
    })
})

export const {useRegisterMutation, useLoginMutation} = userApi;
export default userApi;