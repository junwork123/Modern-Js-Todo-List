import { $ } from "./utils/selector.js";
import { UserList, TodoList, TodoInput } from "./component/index.js";
export default class TodoApp {
    constructor($target) {
        this.$target = $target;
        this.setup();
    }
    setup () {
      const userListTarget =$('#user-list');
      const todoListTarget =$('#todo-list');
      const todoInputTarget =$('#todo-input');
      new UserList(userListTarget);
      new TodoList(todoListTarget);
      new TodoInput(todoInputTarget);
    }
}