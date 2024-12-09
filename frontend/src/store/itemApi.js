import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const itemApi = createApi({
    reducerPath: 'itemApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/items',
        credentials: 'include', // cookies
    }),

    endpoints: (builder) => ({

        //pobieranie wszystkich produktów i filtry
        fetchItems: builder.query({
            query: ({ category, minPrice, maxPrice }) => {
                const params = new URLSearchParams({
                    category: category || '',
                    minPrice: minPrice || '',
                    maxPrice: maxPrice || ''
                }).toString();
                return `/?${params}`;
            },
            providesTags: ["items"]
        }),

        //pobieranie jednego produktu
        fetchItemById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "item", id }]
        }),

        //ogłoszenia danego użytokwnika
        fetchUserItems: builder.query({
            query: (userId) => `/?userId=${userId}`, //zapytanie do backendu z userId
            providesTags: (result, error, userId) =>
                result
                    ? [...result.map(({ _id }) => ({ type: "item", id: _id })), { type: "item", id: "USER_ITEMS" }]
                    : [{ type: "item", id: "USER_ITEMS" }],
        }),

        //dodawanie nowego produktu
        addItem: builder.mutation({
            query: (newitem) => ({
                url: "/new-item",
                method: "POST",
                body: newitem,
            }),
            invalidatesTags: ["items"]
        }),

        //aktualizacja produktu
        updateItem: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/edit-item/${id}`,
                method: "PATCH",
                body: updatedData,
                credentials: "include"
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "item", id }, "items"]
        }),

        //usuwanie produktu
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
                credentials: "include"
            }),
            invalidatesTags: ["items"]
        }),
    })
});

// Eksportowanie hooków do użycia w komponentach
export const { useFetchItemsQuery, useFetchItemByIdQuery, useAddItemMutation, useUpdateItemMutation, useDeleteItemMutation, useFetchUserItemsQuery } = itemApi;

export default itemApi;
