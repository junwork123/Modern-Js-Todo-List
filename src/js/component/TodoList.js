import Component from "../core/Component.js";
import {store} from "../store/index.js";
import {deleteTodo} from "../store/todo/creator.js";

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
        this.clickDeleteButton();
        this.editTodoItem();
    }
    clickDeleteButton() {
        this.addEvent('click', '.destroy', (event) => {
            this.deleteTodoItem(event.target);
            event.stopImmediatePropagation();
        })
    }
    deleteTodoItem(target) {
        if(!confirm('정말 삭제하시겠습니까?')) { return; }
        const itemId = target.closest('li').dataset.id
        store.dispatch(deleteTodo(itemId));
    }

    editTodoItem() {
        this.addEvent('dblclick', '', (event) => {

        })
    }
}