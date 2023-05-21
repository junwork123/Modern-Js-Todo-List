import {store} from "../store/index.js";
import {filteredTodoList} from "./filter.js";

const selectedUserTodoList = () => {
    const { todos, selectedUser, filter } = store.getState();
    const selectedUserTodos = todos.filter(todo => todo.user === selectedUser);
    return filteredTodoList(filter, selectedUserTodos);
}

export { selectedUserTodoList };