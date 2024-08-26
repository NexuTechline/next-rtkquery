"use client"

import { useState } from "react"
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useToggleTodoMutation,
} from "../lib/api"

export default function TodoList() {
    const [newTodo, setNewTodo] = useState("")
    const { data: todos, error, isLoading } = useGetTodosQuery()
    const [addTodo] = useAddTodoMutation()
    const [toggleTodo] = useToggleTodoMutation()

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newTodo.trim()) {
            await addTodo({ text: newTodo.trim(), completed: false })
            setNewTodo("")
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {JSON.stringify(error)}</div>

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos?.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                        }}
                    >
                        <span onClick={() => toggleTodo(todo.id)}>
                            {todo.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
