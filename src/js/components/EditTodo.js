export default class EditTodo {
    constructor(store, $todoList, viewTodo) {
        this.store = store;
        this.$todoList = $todoList;
        this.viewTodo = viewTodo;
        this.mount();
    }
    mount() {
        this.$todoList.addEventListener('dblclick', this.editTodo.bind(this));
    }

    editTodoItem = ({ target, key }, originalValue) => {
        if(!target.value) {
            return;
        }
        switch (key) {
            case 'Enter':
                return this.updateTodoItem(target.closest('li'), target.value);
            case 'Escape':
                target.value = originalValue;
                return target.closest('li').classList.remove('editing');
        }
    }

    updateTodoItem = (updateId, value) => {
        this.todos = this.todos.map((todo) => {
            if (todo.id === updateId) {
                todo.title = value;
            }
            this.store.setTodos(this.todos);
            this.viewTodo.render();
        });
    }

    editTodo = ({ target }) => {
        this.todos = this.store.getTodos();
        if(target.className === 'label'){
            const originValue = target.innerText;
            target.closest('li').classList.add('editing');
            target
                .closest('li')
                .addEventListener('keyup', this.editTodoItem.bind(this, originValue));
        }
    }
}