import { getTodos, setTodos } from "../utils/store.js";

export default class AddTodo {
    constructor($newTodoTitle, viewTodo) {
        this.$newTodoTitle = $newTodoTitle;
        this.viewTodo = viewTodo;
        this.mount();
    }
    mount() {
        this.$newTodoTitle.addEventListener('keyup', this.addTodo.bind(this));
    }
    addTodo = ({ target, key }) => {
        if (key === 'Enter' && target.value) {
            // Nullish coalescing operator (??) 사용
            this.todos = getTodos();
            this.todos.push({
                id: String(Date.now()),
                title: target.value,
                completed: false,
            });
            target.value = '';
            setTodos(this.todos);
            this.viewTodo.render();
        }
    }
}