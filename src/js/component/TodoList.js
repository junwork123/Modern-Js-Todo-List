import Component from "../core/Component.js";
import {store} from "../store/index.js";
import {deleteTodo} from "../store/todo/creator.js";
import {TODO_STATUS} from "../utils/constants.js";

const TodoItem = (todo) => {
    const { id, content, completed } = todo;
    return `
        <li data-id="${id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${completed ? 'checked' : ''} />
                <label class="label">
                  ${content}
                </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value=${content} />
        </li>
    `;
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
                ${ todos && todos.map((todo) => TodoItem(todo)).join('') }
            </ul>
        `;
    }

    setEvent () {
        this.onClickDeleteButton();
        this.onDoubleClickTodoItem();
    }
    onClickDeleteButton() {
        this.addEvent('click', '.destroy', (event) => {
            if(!confirm('정말 삭제하시겠습니까?')) { return; }

            const todoItem = this.getTargetTodoItem(event);
            this.deleteTodoItem(todoItem);

            event.stopImmediatePropagation();
        })
    }
    deleteTodoItem(todoItem) { store.dispatch(deleteTodo(todoItem.dataset.id)); }
    onDoubleClickTodoItem() {
        this.addEvent('dblclick', 'li', (event) => {
            const todoItem = this.getTargetTodoItem(event);
            todoItem.classList.add(TODO_STATUS.EDITING);
        })
    }
    getTargetTodoItem(event) {
        return event.target.closest('li');
    }
}