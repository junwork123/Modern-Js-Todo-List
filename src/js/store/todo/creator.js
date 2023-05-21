import {
    CREATE_TODO,
    DELETE_TODO,
    UPDATE_TODO_CONTENT,
    TOGGLE_TODO_COMPLETE,
    CHANGE_FILTER,
    DELETE_ALL_TODO,
} from './actions.js'

const createTodo = (todo) => {
    return {
        type: CREATE_TODO,
        payload: {
            todo
        },
    }
}

const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        payload: {
            id,
        },
    }
}

const updateTodoContent = (id, content) => {
    return {
        type: UPDATE_TODO_CONTENT,
        payload: {
            id,
            content,
        },
    }
}
const toggleTodoComplete = (id) => {
    return {
        type: TOGGLE_TODO_COMPLETE,
        payload: {
            id,
        },
    }
}
const changeFilter = (filter) => {
    return {
        type: CHANGE_FILTER,
        payload: {
            filter,
        },
    }
}

const deleteAllTodo = () => {
    return {
        type: DELETE_ALL_TODO,
    }
}
export {
    createTodo,
    deleteTodo,
    updateTodoContent,
    toggleTodoComplete,
    changeFilter,
    deleteAllTodo,
}