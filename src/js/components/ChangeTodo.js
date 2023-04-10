import { TODO_BUTTONS } from "../utils/constants.js";
import { getTodos, setTodos } from "../utils/store.js";
export default class ChangeTodo {
    constructor($todoList, viewTodo) {
        this.$todoList = $todoList;
        this.viewTodo = viewTodo;
        this.mount();
    }

    mount() {
        this.$todoList.addEventListener('click', this.changeTodo.bind(this));
    }

    changeTodo = ({ target }) => {
        this.$todos = getTodos();
        if(target.classList.contains(TODO_BUTTONS.TOGGLE)){
           return this.toggleTodo(target);
        }
        if(target.classList.contains(TODO_BUTTONS.DESTROY)){
            return this.removeTodo(target);
        }
    }

    toggleTodo = (target) => {
        this.$todos.map((todo) => {
           if(todo.id === target.id){
               todo.completed = !todo.completed;
           }
        });
        setTodos(this.$todos)
        this.viewTodo.render();
    }

    removeTodo = (target) => {
        this.$todos = this.$todos.filter((todo) => todo.id !== target.id);
        setTodos(this.$todos);
        this.viewTodo.render();
    }
}