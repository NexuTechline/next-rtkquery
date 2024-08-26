import { NextResponse } from "next/server"

let todos = [
    { id: 1, text: "Learn Next.js", completed: false },
    { id: 2, text: "Build a todo app", completed: false },
]

export async function GET() {
    console.log(todos)

    return NextResponse.json(todos)
}

export async function POST(request: Request) {
    const newTodo = await request.json()
    const todo = {
        id: todos.length + 1,
        ...newTodo,
    }
    todos.push(todo)
    console.log(todos)
    return NextResponse.json(todo)
}
