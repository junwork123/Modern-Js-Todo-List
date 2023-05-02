import {
    GET_TODOS,
    CREATE_TODO,
    DELETE_TODO,
} from './actions.js'

const getTodos = (todos) => {
    return {
        type: GET_TODOS,
        payload: {
            todos,
        },
    }
}

const createTodo = (content) => {
    return {
        type: CREATE_TODO,
        payload: {
            id: String(Date.now()),
            content: content,
            completed: false
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
export { getTodos, createTodo, deleteTodo }