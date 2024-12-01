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
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            })
        }),

        get: builder.mutation({
            query: () => ({
                url: "/users",
                method: "GET"
            }),

            refetchOnMount: true,
            invalidatesTags: ["Users"]


        }),

        delete: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User"]
        }),

        updatelevel: builder.mutation({
            query: ({ userId, level }) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: { level }
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"]
        }),

        edit: builder.mutation({
            query: ({ userData }) => ({
                url: "/edit-profile",
                method: "PATCH",
                body: { userData }
            })

        })
    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useEditMutation, useGetMutation, useDeleteMutation, useUpdatelevelMutation } = userApi;
export default userApi;