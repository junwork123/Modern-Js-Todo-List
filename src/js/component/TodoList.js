import Component from "../core/Component.js";
import { store } from "../store/index.js";
import { deleteTodo, updateTodoContent, toggleTodoComplete } from "../store/todo/creator.js";
import { TODO_STATUS } from "../utils/constants.js";

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
        const { todos } = store.getState();

        // 컴포넌트의 내용을 반환
        // join을 하지 않으면 ','까지 같이 출력된다
        return `
            <ul class="todo-list">
                ${renderTodoList(todos)}
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
            if(!confirm('정말 삭제하시겠습니까?')) { return; }

            const todoItem = this.getTargetTodoItem(event);
            this.deleteTodoItem(todoItem);
        })
    }
    onClickCompleteButton() {
        this.addEvent('click', '.toggle', (event) => {
            const todoItem = this.getTargetTodoItem(event);
            this.toggleTodoComplete(todoItem);
            this.render();
        })
    }
    onDoubleClickTodoItem() {
        this.addEvent('dblclick', 'li', (event) => {
            const todoItem = this.getTargetTodoItem(event);
            todoItem.classList.add(TODO_STATUS.EDITING);
        })
    }
    onEditTodoItem() {
        this.addEvent('keydown', '.edit', (event) => {
            const todoItem = this.getTargetTodoItem(event);
            const editingTodoItem = event.target;
            const originValue = editingTodoItem.dataset.origin;

            switch (event.key) {
                case 'Escape':
                    editingTodoItem.value = originValue;
                    todoItem.classList.remove(TODO_STATUS.EDITING);
                    break;
                case 'Enter':
                    this.updateTodoContent(todoItem, editingTodoItem.value);
                    todoItem.classList.remove(TODO_STATUS.EDITING);
                    this.render();
                    break;
            }
        });
    }
    deleteTodoItem(todoItem) { store.dispatch(deleteTodo(todoItem.dataset.id)); }
    toggleTodoComplete(todoItem) { store.dispatch(toggleTodoComplete(todoItem.dataset.id)); }
    updateTodoContent(todoItem, newContent) {
        if(!newContent) { return; }
        store.dispatch(updateTodoContent(todoItem.dataset.id, newContent));
    }

    getTargetTodoItem(event) {
        return event.target.closest('li');
    }
}