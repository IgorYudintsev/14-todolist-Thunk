import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, DomainTodolist,
    removeTodolistAC,
    todolistsReducer,
    TodolistType,
} from "../todolists-reducer"
import {v1} from "uuid"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: "2024-10-20T05:07:02.74",
            order: -19,
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: "2024-10-20T05:07:02.74",
            order: -19,
        },
    ]
})

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
    const newTitle = "New Todolist"
    const newTodolist={
            id: v1(),
            title: newTitle,
            filter: "all",
            addedDate: "2024-10-20T05:07:02.74",
            order: -19,
        }


    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test("correct todolist should change its name", () => {
    const newTitle = "New Todolist"

    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title: newTitle}))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTitle)
})

test("correct filter of todolist should be changed", () => {
    const newFilter = "completed"

    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter: newFilter}))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})
