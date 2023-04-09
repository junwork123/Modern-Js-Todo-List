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
        this.$todos = JSON.parse(localStorage.getItem('todos'));
        if(target.classList.contains('toggle')){
           return this.toggleTodo(target);
        }
        if(target.classList.contains('destroy')){
            return this.removeTodo(target);
        }
    }

    toggleTodo = (target) => {
        this.$todos.map((todo) => {
           if(todo.id === target.id){
               todo.completed = !todo.completed;
           }
        });
        localStorage.setItem('todos', JSON.stringify(this.$todos));
        this.viewTodo.render();
    }

    removeTodo = (target) => {
        this.$todos = this.$todos.filter((todo) => todo.id !== target.id);
        localStorage.setItem('todos', JSON.stringify(this.$todos));
        this.viewTodo.render();
    }
}