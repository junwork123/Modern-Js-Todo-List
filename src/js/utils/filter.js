import { FILTER_TYPE } from "./constants.js";

const isFilteredTodo = (filter, todo) => {
    switch (filter) {
        case FILTER_TYPE.ACTIVE:
            return !todo.completed;
        case FILTER_TYPE.COMPLETED:
            return todo.completed;
        case FILTER_TYPE.ALL:
            return true;
    }
}

export { isFilteredTodo }