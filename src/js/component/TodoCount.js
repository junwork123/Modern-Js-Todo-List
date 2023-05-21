import Component from "../core/Component.js";
import { store } from "../store/index.js";
import { changeFilter, deleteAllTodo } from "../store/todo/creator.js";
import { FILTER_TYPE } from "../utils/constants.js";
import { filteredTodo } from "../utils/filter.js";

const renderTodoCount = (todos, filter) => {
    const count = todos && todos.filter(todo => filteredTodo (filter, todo)).length;
    return '총 <strong>' + count + '</strong> 개';
}

const setFilter = (filterType, filter) => {
    return filterType === filter ? filterType + ' selected' : filterType;
}
const renderFilterList = (filter) => {
    return `
        <li>
            <a href="#" class="${setFilter(FILTER_TYPE.ALL, filter)}">전체보기</a>
        </li>
        <li>
            <a href="#active" class="${setFilter(FILTER_TYPE.ACTIVE, filter)}">해야할 일</a>
        </li>
        <li>
            <a href="#completed" class="${setFilter(FILTER_TYPE.COMPLETED, filter)}">완료한 일</a>
        </li>
    `;
}

export default class TodoCount extends Component {
    initState() { return {}; }
    mounted() {
        // 컴포넌트가 마운트된 후에 동작한다.
    }
    template() {
        const { todos, filter } = store.getState();
        return `
            <span class="todo-count">
                ${renderTodoCount(todos, filter)}
            </span>
            <ul class="filters">
                ${renderFilterList(filter)}
            </ul>
            <button class="clear-completed">모두 삭제</button>
        `;
    }

    setEvent() {
        this.onClickFilter();
        this.onClickDeleteAllButton();
    }
    onClickFilter() {
        this.addEvent('click', '.filters a', (event) => {
            const filter = event.target.className;
            this.changeFilter(filter);
            this.render();
        })
    }
    changeFilter(filter) {
        store.dispatch(changeFilter(filter));
    }

    onClickDeleteAllButton() {
        this.addEvent('click', '.clear-completed', (event) => {
            if(!confirm('정말 삭제하시겠습니까?')) { return; }
            store.dispatch(deleteAllTodo());
        })
    }
}