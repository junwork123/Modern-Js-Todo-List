export default class EditTodo {
    constructor($todoList, viewTodo) {
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
            localStorage.setItem('todos', JSON.stringify(this.todos));
            this.viewTodo.render();
        });
    }

    editTodo = ({ target }) => {
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if(target.className === 'label'){
            const originValue = target.innerText;
            target.closest('li').classList.add('editing');
            target
                .closest('li')
                .addEventListener('keyup', ({ target, key }) =>
                    this.editTodoItem({ target, key }, originValue),
                );
        }
    }
}