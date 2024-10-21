import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import {ChangeEvent} from "react"
import {EditableSpan} from "common/components"
import {useAppDispatch} from "common/hooks/useAppDispatch"
import {
    changeTaskItemThunk,
   removeTaskThunk
} from "../../../../../model/tasks-reducer"
import {TodolistType} from "../../../../../model/todolists-reducer"
import {getListItemSx} from "./Task.styles"
import {DomainTask} from "../../../../../api/tasksApi.types";
import {TaskStatus} from "common/enums";

type Props = {
    task: DomainTask
    todolist: TodolistType
}

export const Task = ({task, todolist}: Props) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskThunk({taskId: task.id, todolistId: todolist.id}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        //TODO: вначале передавали статус, а потом унивесально через объект
        // dispatch(changeTaskStatusThunk({taskId: task.id, status, todolistId: todolist.id}))
        dispatch(changeTaskItemThunk({taskId: task.id, item: {status}, todolistId: todolist.id}))
    }

    const changeTaskTitleHandler = (title: string) => {
        //TODO: вначале передавали title, а потом унивесально через объект
        // dispatch(changeTaskTitleAC({taskId: task.id, title, todolistId: todolist.id}))
        dispatch(changeTaskItemThunk({taskId: task.id, item: {title}, todolistId: todolist.id}))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.status)}>
            <div>
                <Checkbox
                    checked={!!task.status}
                    onChange={changeTaskStatusHandler}
                />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}
