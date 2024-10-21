import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer"
import {DomainTask, UpdateTaskModel} from "../api/tasksApi.types";
import {AppDispatch, RootState} from "app/store";
import {tasksApi} from "../api/tasksApi";
import {TaskStatus} from "common/enums";


export type TasksStateType = {
    [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            const todoListId = action.payload.todoListId
            return {...state, [todoListId]: action.payload.data}
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
            }
        }
        case "ADD-TASK": {
            const {newTask, todolistId} = action.payload
            return {...state, [todolistId]: [newTask, ...state[todolistId]]}

        }

        case "CHANGE_TASK": {
            const{todolistId,taskId,model}=action.payload
            return {...state, [todolistId]: state[todolistId].map((t) => t.id === taskId
                        ? model
                        : t,
                ),
            }
        }


        case "ADD-TODOLIST":
            return {...state, [action.payload.id]: []}

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            return state
    }
}

// Action creators


const setTasksAC = (todoListId: string, data: DomainTask[]) => {
    return {
        type: 'SET-TASKS',
        payload: {todoListId, data}
    } as const
}
export const setTasksThunk = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await tasksApi.getTasks(id)
        dispatch(setTasksAC(id, res.data.items))
    } catch (e) {
        console.log(e)
    }
}
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
    return {
        type: "REMOVE-TASK",
        payload,
    } as const
}
export const removeTaskThunk = (payload: { taskId: string; todolistId: string }) => async (dispatch: AppDispatch) => {
    try {
        const res = await tasksApi.deleteTask(payload)
        dispatch(removeTaskAC(payload))
    } catch (e) {
        console.log(e)
    }
}
export const addTaskAC = (payload: { newTask: DomainTask; todolistId: string }) => {
    return {
        type: "ADD-TASK",
        payload,
    } as const
}
export const addTaskThunk = (payload: { title: string; todolistId: string }) => async (dispatch: AppDispatch) => {
    try {
        const res = await tasksApi.createTask(payload)
        const newTask = res.data.data.item
        dispatch(addTaskAC({newTask: newTask, todolistId: payload.todolistId}))
    } catch (e) {
        console.log(e)
    }
}

export const changeTaskAC = (payload: { taskId: string; model: DomainTask; todolistId: string }) => {
    return {
        type: "CHANGE_TASK",
        payload,
    } as const
}


export const changeTaskItemThunk = (payload: {
    taskId: string;
    // status: TaskStatus;   // вначале передавали status, а затем сделали универсально
    item: {status:TaskStatus } | {title: string};
    todolistId: string
}) => async (dispatch: AppDispatch, getState: () => RootState) => {
    //TODO:  getState: () => RootState
    // const {taskId, todolistId, status} = payload
    const {taskId, todolistId,item} = payload
    try {
        const state = getState()
        const currentTask = state.tasks[todolistId].find(el => el.id === taskId)
        if (currentTask) {
            // const model = {...currentTask, status}
            const model = {...currentTask, ...item}
            const res = await tasksApi.updateTask({taskId, todolistId, model})
            dispatch(changeTaskAC({model:res.data.data.item,taskId,todolistId}))
        }
    } catch (e) {
        console.log(e)
    }
}


// Actions types
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
// export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskActionType = ReturnType<typeof changeTaskAC>
// export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    | SetTasksActionType
    | RemoveTaskActionType
    | AddTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ChangeTaskActionType

