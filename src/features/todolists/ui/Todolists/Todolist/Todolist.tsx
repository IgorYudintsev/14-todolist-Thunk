import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks"
import {addTaskAC, addTaskThunk} from "../../../model/tasks-reducer"
import { TodolistType } from "../../../model/todolists-reducer"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

type Props = {
  todolist: TodolistType
}

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const addTaskCallback = (title: string) => {
    dispatch(addTaskThunk({ title, todolistId: todolist.id }))
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  )
}
