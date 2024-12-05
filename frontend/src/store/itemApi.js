import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const itemApi = createApi({
    reducerPath: 'itemApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/items',
        credentials: 'include', // cookies
    }),

    endpoints: (builder) => ({

        // Pobieranie wszystkich produktów z filtrami
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

        // Pobieranie pojedynczego produktu
        fetchItemById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "item", id }]
        }),

        // Dodawanie nowego produktu
        addItem: builder.mutation({
            query: (newitem) => ({
                url: "/new-item",
                method: "POST",
                body: newitem
            }),
            invalidatesTags: ["items"]
        }),

        // Aktualizacja produktu
        updateItem: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/edit-item/${id}`,
                method: "PATCH",
                body: updatedData,
                credentials: "include"
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "item", id }, "items"]
        }),

        // Usuwanie produktu
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
export const { useFetchItemsQuery, useFetchItemByIdQuery, useAddItemMutation, useUpdateItemMutation, useDeleteItemMutation } = itemApi;

export default itemApi;
