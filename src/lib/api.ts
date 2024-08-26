import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Todo {
    id: number
    text: string
    completed: boolean
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => "todos",
            providesTags: ["Todos"],
        }),
        addTodo: builder.mutation<Todo, Omit<Todo, "id">>({
            query: (todo) => ({
                url: "todos",
                method: "POST",
                body: todo,
            }),
            invalidatesTags: ["Todos"],
        }),
        toggleTodo: builder.mutation<Todo, number>({
            query: (id) => ({
                url: `todos/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
})

export const { useGetTodosQuery, useAddTodoMutation, useToggleTodoMutation } =
    api

