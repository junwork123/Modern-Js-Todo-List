import {
    GET_TODOS,
    CREATE_TODO,
    DELETE_TODO,
    UPDATE_TODO_CONTENT,
} from './actions.js'

const getTodos = (todos) => {
    return {
        type: GET_TODOS,
        payload: {
            todos,
        },
    }
}

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
export { getTodos, createTodo, deleteTodo, updateTodoContent }