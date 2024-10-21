import {v1} from "uuid"
import {AppDispatch} from "app/store";
import {todolistsApi} from "../api/todolistsApi";
import {Todolist} from "../api/todolistsApi.types";
import {setTasksThunk} from "./tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
}

// export type Todolist = {
//     id: string
//     title: string
//     addedDate: string
//     order: number
// }


const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.payload.data.map(el => ({...el, filter: 'all'}))
        }
        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            const newTodolist: DomainTodolist = {...action.payload, filter: 'all'}
            return [newTodolist, ...state]
            // return state
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((tl) => (tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl))
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map((tl) => (tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl))
        }

        default:
            return state
    }
}

// Action creators

export const setTodolistsAC = (data: Todolist[]) => {
    return {
        type: "SET-TODOLISTS",
        payload: {data}
    } as const
}


export const setTodolistsThunk = () => async (dispatch: AppDispatch) => {
    try {
        const res = await todolistsApi.getTodolists()
        dispatch(setTodolistsAC(res.data))
        res.data.forEach(el => {
            dispatch(setTasksThunk(el.id))
        })
    } catch (e) {
        console.log(e)
    }
}


export const removeTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", payload: {id}} as const
}

export const removeTodolistThunk = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const res = todolistsApi.deleteTodolist(id)
        dispatch(removeTodolistAC(id))
    } catch (e) {
        console.log(e)
    }
}

export const addTodolistAC = (todolists: Todolist) => {
    return {
        type: "ADD-TODOLIST",
        payload: todolists
    } as const
}
export const addTodolistThunk = (title: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await todolistsApi.createTodolist(title)
        dispatch(addTodolistAC(res.data.data.item))
    } catch (e) {
        console.log(e)
    }
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload} as const
}

export const changeTodolistTitleThunk = (payload: { id: string; title: string }) => async (dispatch: AppDispatch) => {
    try {
        const res = await todolistsApi.updateTodolist(payload)
        dispatch(changeTodolistTitleAC(payload))
    } catch (e) {
        console.log(e)
    }
}


export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
    return {type: "CHANGE-TODOLIST-FILTER", payload} as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
