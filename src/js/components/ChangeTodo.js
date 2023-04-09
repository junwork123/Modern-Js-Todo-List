export default class ChangeTodo {
    constructor(store, $todoList, viewTodo) {
        this.store = store;
        this.$todoList = $todoList;
        this.viewTodo = viewTodo;
        this.mount();
    }

    mount() {
        this.$todoList.addEventListener('click', this.changeTodo.bind(this));
    }

    changeTodo = ({ target }) => {
        this.todos = this.store.getTodos();
        if(target.classList.contains('toggle')){
           return this.toggleTodo(target);
        }
        if(target.classList.contains('destroy')){
            return this.removeTodo(target);
        }
    }

    toggleTodo = (target) => {
        this.todos.map((todo) => {
           if(todo.id === target.id){
               todo.completed = !todo.completed;
           }
        });
        this.store.setTodos(this.$todos);
        this.viewTodo.render();
    }

    removeTodo = (target) => {
        this.todos = this.todos.filter((todo) => todo.id !== target.id);
        this.store.setTodos(this.todos);
        this.viewTodo.render();
    }
}