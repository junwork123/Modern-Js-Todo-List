import { $ } from "./utils/selector.js";
import {
    UserList,
    TodoList,
    TodoInput,
    TodoCount,
    UserTitle,
} from "./component/index.js";
export default class TodoApp {
    constructor($target) {
        this.$target = $target;
        this.setup();
    }
    setup () {
      const userListTarget =$('#user-list');
      const todoListTarget =$('#todo-list');
      const todoInputTarget =$('#todo-input');
      const todoCountTarget =$('#todo-count');
      const userTitleTarget =$('#user-title');
      new UserList(userListTarget);
      new TodoList(todoListTarget);
      new TodoInput(todoInputTarget);
      new TodoCount(todoCountTarget);
      new UserTitle(userTitleTarget);
    }
}