import { $ } from "./utils/selector.js";
import AddTodo from "./components/AddTodo.js";
import ViewTodo from "./components/ViewTodo.js";
export default class App {
    constructor() {
        this.todoList = $('.todo-list');
        this.todoCount = $('.todo-count strong');
        this.newTodoTitle = $('.new-todo');
        this.viewTodo = new ViewTodo(this.todoList, this.todoCount);
        this.addTodo = new AddTodo(this.newTodoTitle, this.viewTodo);
    }
}