import { TODO_BUTTONS } from "../utils/constants.js";
import { getTodos, setTodos } from "../utils/store.js";
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
                return target.closest('li').classList.remove(TODO_BUTTONS.EDITING);
        }
    }

    updateTodoItem = (updateId, value) => {
        this.todos = this.todos.map((todo) => {
            if (todo.id === updateId) {
                todo.title = value;
            }
            setTodos(this.todos);
            this.viewTodo.render();
        });
    }

    editTodo = ({ target }) => {
        this.todos = getTodos();
        if(target.className === TODO_BUTTONS.LABEL){
            const originValue = target.innerText;
            target.closest('li').classList.add(TODO_BUTTONS.EDITING);
            target
                .closest('li')
                .addEventListener('keyup', this.editTodoItem.bind(this, originValue));
        }
    }
}