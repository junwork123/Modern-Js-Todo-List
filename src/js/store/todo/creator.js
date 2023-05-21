import {
    CHANGE_FILTER,
    CREATE_TODO,
    DELETE_ALL_TODO,
    DELETE_TODO,
    TOGGLE_TODO_COMPLETE,
    UPDATE_TODO_CONTENT,
} from './actions.js'
import {store} from "../index.js";

const createTodo = (todo) => {
    store.dispatch({
        type: CREATE_TODO,
        payload: {
            todo
        },
    });
}

const deleteTodo = (id) => {
    store.dispatch({
        type: DELETE_TODO,
        payload: {
            id,
        },
    });
}

const updateTodoContent = (id, content) => {
    store.dispatch({
        type: UPDATE_TODO_CONTENT,
        payload: {
            id,
            content,
        },
    });
}
const toggleTodoComplete = (id) => {
    store.dispatch({
        type: TOGGLE_TODO_COMPLETE,
        payload: {
            id,
        },
    });
}
const changeFilter = (filter) => {
    store.dispatch({
        type: CHANGE_FILTER,
        payload: {
            filter,
        },
    });
}

const deleteAllTodo = () => {
    store.dispatch({
        type: DELETE_ALL_TODO,
    });
}

const getTodoList = () => {
    const { todos } = store.getState();
    return todos;
}

const getFilter = () => {
    const { filter } = store.getState();
    return filter;
}

const getSelectedUserTodoList = () => {
    const { todos, selectedUser } = store.getState();
    return todos.filter(todo => todo.user === selectedUser);
}

export {
    createTodo,
    deleteTodo,
    updateTodoContent,
    toggleTodoComplete,
    changeFilter,
    deleteAllTodo,
    getTodoList,
    getFilter,
    getSelectedUserTodoList,
}