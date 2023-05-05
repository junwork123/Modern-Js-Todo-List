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
export { getTodos, createTodo, deleteTodo }