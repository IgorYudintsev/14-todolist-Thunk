import {
    addTaskAC, changeTaskAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType,
} from "../tasks-reducer"
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer"

let startState: TasksStateType

beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: "1",
                title: "CSS",
                status: 0,
                addedDate: "2024-10-20T04:12:31.487",
                deadline: 'xz',
                description: 'xz',
                order: -10,
                priority: 1,
                startDate: 'xz',
                todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
            },
            {
                id: "2", title: "JS", status: 2,
                addedDate: "2024-10-20T04:12:31.487",
                deadline: 'xz',
                description: 'xz',
                order: -10,
                priority: 1,
                startDate: 'xz',
                todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
            },
            {
                id: "3", title: "React", status: 0,
                addedDate: "2024-10-20T04:12:31.487",
                deadline: 'xz',
                description: 'xz',
                order: -10,
                priority: 1,
                startDate: 'xz',
                todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
            },
        ],
        todolistId2: [
            {
                id: "1", title: "bread", status: 0, addedDate: "2024-10-20T04:12:31.487",
                deadline: 'xz',
                description: 'xz',
                order: -10,
                priority: 1,
                startDate: 'xz',
                todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
            },
            {
                id: "2", title: "milk", status: 2,
                addedDate: "2024-10-20T04:12:31.487",
                deadline: 'xz',
                description: 'xz',
                order: -10,
                priority: 1,
                startDate: 'xz',
                todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
            },
            {
                id: "3", title: "tea", status: 0,
                addedDate: "2024-10-20T04:12:31.487",
                deadline: 'xz',
                description: 'xz',
                order: -10,
                priority: 1,
                startDate: 'xz',
                todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
            },
        ],
    }
})

test("correct task should be deleted from correct array", () => {
    const endState = tasksReducer(
        startState,
        removeTaskAC({
            taskId: "2",
            todolistId: "todolistId2",
        }),
    )

    expect(endState).toEqual({
        todolistId1: [
            {
                id: "1",
                title: "CSS",
                status: 0,
                addedDate: "2024-10-20T04:12:31.487",
                deadline: 'xz',
                description: 'xz',
                order: -10,
                priority: 1,
                startDate: 'xz',
                todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
            },
            {
                id: "2", title: "JS", status: 2,
                addedDate: "2024-10-20T04:12:31.487",
                deadline: 'xz',
                description: 'xz',
                order: -10,
                priority: 1,
                startDate: 'xz',
                todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
            },
            {
                id: "3", title: "React", status: 0,
                addedDate: "2024-10-20T04:12:31.487",
                deadline: 'xz',
                description: 'xz',
                order: -10,
                priority: 1,
                startDate: 'xz',
                todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
            },
        ],
        todolistId2: [
            {
                id: "1", title: "bread", status: 0, addedDate: "2024-10-20T04:12:31.487",
                deadline: 'xz',
                description: 'xz',
                order: -10,
                priority: 1,
                startDate: 'xz',
                todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
            },
            {
                id: "3", title: "tea", status: 0,
                addedDate: "2024-10-20T04:12:31.487",
                deadline: 'xz',
                description: 'xz',
                order: -10,
                priority: 1,
                startDate: 'xz',
                todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
            },
        ],
    })
})

test("correct task should be added to correct array", () => {
    const newTask = {
        id: "1",
        title: "juce",
        status: 0,
        addedDate: "2024-10-20T04:12:31.487",
        deadline: 'xz',
        description: 'xz',
        order: -10,
        priority: 1,
        startDate: 'xz',
        todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
    }

    const endState = tasksReducer(startState, addTaskAC({newTask, todolistId: "todolistId2"}))

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId2"][0].status).toBe(0)
})

test("status of specified task should be changed", () => {
    const model=   {
        id: "2", title: "milk", status: 0,
        addedDate: "2024-10-20T04:12:31.487",
        deadline: 'xz',
        description: 'xz',
        order: -10,
        priority: 1,
        startDate: 'xz',
        todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
    }
    const endState = tasksReducer(
        startState,
        changeTaskAC({
            taskId: "2",
            model,
            todolistId: "todolistId2",
        }),
    )

    expect(endState["todolistId2"][1].status).toBe(0)
    expect(endState["todolistId1"][1].status).toBe(2)
})

test("title of specified task should be changed", () => {
    const model=   {
        id: "2", title: "coffee", status: 0,
        addedDate: "2024-10-20T04:12:31.487",
        deadline: 'xz',
        description: 'xz',
        order: -10,
        priority: 1,
        startDate: 'xz',
        todoListId: "a9b41ee6-d343-4927-b60b-90481e0b2aed"
    }
    const endState = tasksReducer(
        startState,
        changeTaskAC({
            taskId: "2",
            model,
            todolistId: "todolistId2",
        }),
    )

    expect(endState["todolistId2"][1].title).toBe("coffee")
    expect(endState["todolistId1"][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {
    const newTodolist={
        addedDate: "2024-10-20T05:07:02.74",
        filter: "all",
        id: "981ef5b5-a3a8-429c-b755-3fc48308c2c1",
        order: -19,
        title: "new todolist"
    }
    const endState = tasksReducer(startState, addTodolistAC(newTodolist))

    const keys = Object.keys(endState)
    const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
    const endState = tasksReducer(startState, removeTodolistAC("todolistId2"))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
    // or
    expect(endState["todolistId2"]).toBeUndefined()
})
