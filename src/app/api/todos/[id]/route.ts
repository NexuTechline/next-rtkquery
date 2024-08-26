import { NextResponse } from "next/server"

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    let todos = [
        { id: 1, text: "Learn Next.js", completed: false },
        { id: 2, text: "Build a todo app", completed: false },
    ]

    const id = parseInt(params.id)
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed
        return NextResponse.json(todos[todoIndex])
    }
    console.log("todos", todos)

    return NextResponse.json({ error: "Todo not found" }, { status: 404 })
}
