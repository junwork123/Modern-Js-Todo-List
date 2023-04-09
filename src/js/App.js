import { $ } from "./utils/selector.js";
import AddTodo from "./components/AddTodo.js";
import ViewTodo from "./components/ViewTodo.js";
import ChangeTodo from "./components/ChangeTodo.js";
import EditTodo from "./components/EditTodo.js";
import FilterTodo from "./components/FilterTodo.js";

export default class App {
    constructor(store) {
        this.$todoList = $('.todo-list');
        this.$todoCount = $('.todo-count strong');
        this.$filters = $('.filters');
        this.$newTodoTitle = $('.new-todo');
        this.viewTodo = new ViewTodo(store, this.$todoList, this.$todoCount);
        this.addTodo = new AddTodo(store, this.$newTodoTitle, this.viewTodo);
        this.changeTodo = new ChangeTodo(store, this.$todoList, this.viewTodo);
        this.editTodo = new EditTodo(store, this.$todoList, this.viewTodo);
        this.filterTodo = new FilterTodo(this.$filters, this.viewTodo);
    }
}