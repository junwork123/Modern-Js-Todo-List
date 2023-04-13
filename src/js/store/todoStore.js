import { createStore } from "../core/Store.js";
import { TODO_EVENTS } from "../utils/constants.js";

const initState = {
    todoList: [],
    count: 0
};

export const store = createStore((state = initState, action = {}) => {
    switch (action.type) {
        case TODO_EVENTS.ADD_TODO:
            state.todoList.append(action.payload);
            state.count = state.todoList.count;
            break;
    }

});

export const addTodo = (payload) => ({ type: TODO_EVENTS.ADD_TODO, payload });