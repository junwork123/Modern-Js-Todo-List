import { FILTER_TYPE } from "./constants.js";

const filteredTodo = (filter, todo) => {
    switch (filter) {
        case FILTER_TYPE.ACTIVE:
            return !todo.completed;
        case FILTER_TYPE.COMPLETED:
            return todo.completed;
        case FILTER_TYPE.ALL:
            return true;
    }
}

const filteredTodoList = (filter, todos) => {
    return todos && todos.filter((todo) => filteredTodo (filter, todo));
}


export { filteredTodo, filteredTodoList }