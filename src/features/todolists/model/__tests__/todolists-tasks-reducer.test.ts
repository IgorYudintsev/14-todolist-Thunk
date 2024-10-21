import { tasksReducer, TasksStateType } from "../tasks-reducer"
import {addTodolistAC, DomainTodolist, todolistsReducer, TodolistType} from "../todolists-reducer"
import {v1} from "uuid";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState:DomainTodolist[] = []

  const newTitle = "New Todolist"
  const newTodolist={
    id: 'todolist1',
    title: newTitle,
    filter: "all",
    addedDate: "2024-10-20T05:07:02.74",
    order: -19,
  }

  const action = addTodolistAC(newTodolist)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  // expect(idFromTasks).toBe(action.payload.todolistId)
  expect(idFromTasks).toBe(action.payload.id)
  expect(idFromTodolists).toBe(action.payload.id)
})
