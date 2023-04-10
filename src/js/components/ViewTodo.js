import { FILTER_TYPE, TODO_BUTTONS } from "../utils/constants.js";
import { getTodos } from "../utils/store.js";
export default class ViewTodo {
    constructor( $todoList, $todoCount ) {
        this.$todoList = $todoList;
        this.$todoCount = $todoCount;
        this.todos = [];
        this.render();
    }

    todoTemplate = ({ id, title, completed }) => {
        return `<li id=${id} class=${completed && TODO_BUTTONS.COMPLETED} >
                <div class="view">
                    <input class="toggle" type="checkbox" 
                      id=${id} ${completed && 'checked'} />
                    <label class="label">${title}</label>
                    <button class="destroy" id=${id}></button>
                </div>
                <input class="edit" value="${title}" />
            </li>`;
    };

    renderFilteredTodoList = (filter) => {
        switch (filter) {
            case FILTER_TYPE.ALL:
                this.renderAll(); break;
            case FILTER_TYPE.ACTIVE:
                this.renderActive(); break;
            case FILTER_TYPE.COMPLETED:
                this.renderCompleted(); break;
        }
    }
    renderTodoList = (todoList) => {
        todoList.map((todo) => {
            // insertAdjacentHTML는 DOM을 새로 그리지 않고 요소를 추가한다.
            this.$todoList.insertAdjacentHTML('beforeend', this.todoTemplate(todo));
        });
    }
    renderAll = () => {
        this.renderTodoList(this.todos);
    };
    renderActive = () => {
        const activeTodos = this.todos.filter((todo) => !todo.completed);
        this.renderTodoList(activeTodos);
    }
    renderCompleted = () => {
        const completedTodos = this.todos.filter((todo) => todo.completed);
        this.renderTodoList(completedTodos);
    }

    render = (filter = FILTER_TYPE.ALL) => {
        this.todos = getTodos();
        this.$todoList.innerHTML = '';
        this.renderFilteredTodoList(filter);
        this.$todoCount.innerHTML = this.$todoList.querySelectorAll('li').length;
    }
}