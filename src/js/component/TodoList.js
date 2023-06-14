import Component from "../core/Component.js";
import { TODO_STATUS } from "../utils/constants.js";
import { filteredTodoList } from "../utils/filter.js";
import {
    deleteTodo,
    updateTodoContent,
    toggleTodoComplete,
    getSelectedUserTodoList,
    getFilter,
} from "../store/todo/creator.js";

const TodoItem = (todo) => {
    const { id, content, completed, } = todo;
    return `
        <li data-id="${id}" class="${completed ? 'completed' : ''}">
            <div class="view">
                <input class="toggle" type="checkbox" ${completed ? 'checked' : ''} />
                <label class="label">
                  ${content}
                </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value=${content} data-origin=${content} />
        </li>
    `;
}

const renderTodoList = (todos) => {
    return todos && todos.map((todo) => TodoItem(todo)).join('');
}

export default class TodoList extends Component {
    initState () { return {}; }
    mounted () {
        // 컴포넌트가 마운트된 후에 동작한다.
    }
    template () {
        const todos = getSelectedUserTodoList()
        const filter = getFilter();
        const filteredTodos = filteredTodoList(filter, todos);

        // 컴포넌트의 내용을 반환
        // join을 하지 않으면 ','까지 같이 출력된다
        return `
            <ul class="todo-list">
                ${renderTodoList(filteredTodos)}
            </ul>
        `;
    }

    setEvent () {
        this.onClickDeleteButton();
        this.onClickCompleteButton();
        this.onDoubleClickTodoItem();
        this.onEditTodoItem();
    }
    onClickDeleteButton() {
        this.addEvent('click', '.destroy', (event) => {
            this.deleteTodoItem(event);
        })
    }

    deleteTodoItem(event) {
        if (!confirm('정말 삭제하시겠습니까?')) { return; }

        const todoItem = this.getTargetTodoItem(event);
        deleteTodo(todoItem.dataset.id);
    }

    onClickCompleteButton() {
        this.addEvent('click', '.toggle', (event) => {
            this.toggleTodoComplete(event);
        })
    }

    toggleTodoComplete(event) {
        const todoItem = this.getTargetTodoItem(event);
        toggleTodoComplete(todoItem.dataset.id);
        this.render();
    }

    onDoubleClickTodoItem() {
        this.addEvent('dblclick', 'li', (event) => {
            this.changeTodoStatus(event);
        })
    }

    changeTodoStatus(event) {
        const todoItem = this.getTargetTodoItem(event);
        todoItem.classList.add(TODO_STATUS.EDITING);
    }

    onEditTodoItem() {
        this.addEvent('keydown', '.edit', (event) => {
            this.editTodoItem(event);
        });
    }

    editTodoItem(event) {
        const {todoItem, editingTodoItem, originValue} = this.getEditingContext(event);

        switch (event.key) {
            case 'Escape':
                this.cancelEditing(editingTodoItem, originValue, todoItem);
                break;
            case 'Enter':
                this.updateTodoContent(editingTodoItem, todoItem);
                break;
        }
    }

    getEditingContext(event) {
        const todoItem = this.getTargetTodoItem(event);
        const editingTodoItem = event.target;
        const originValue = editingTodoItem.dataset.origin;
        return {todoItem, editingTodoItem, originValue};
    }

    updateTodoContent(editingTodoItem, todoItem) {
        const newContent = editingTodoItem.value;
        // if(!newContent) { return; }

        updateTodoContent(todoItem.dataset.id, newContent);
        todoItem.classList.remove(TODO_STATUS.EDITING);
        this.render();
    }

    cancelEditing(editingTodoItem, originValue, todoItem) {
        editingTodoItem.value = originValue;
        todoItem.classList.remove(TODO_STATUS.EDITING);
    }

    getTargetTodoItem(event) {
        return event.target.closest('li');
    }
}