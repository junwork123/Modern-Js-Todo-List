export default class AddTodo {
    constructor(store, $newTodoTitle, viewTodo) {
        this.store = store;
        this.$newTodoTitle = $newTodoTitle;
        this.viewTodo = viewTodo;
        this.mount();
    }
    mount() {
        this.$newTodoTitle.addEventListener('keyup', this.addTodo.bind(this));
    }
    addTodo = ({ target, key }) => {
        if (key === 'Enter' && target.value) {
            const todos = this.store.getTodos();
            todos.push({
                id: String(Date.now()),
                title: target.value,
                completed: false,
            });
            target.value = '';
            this.store.setTodos(todos);
            this.viewTodo.render();
        }
    }
}