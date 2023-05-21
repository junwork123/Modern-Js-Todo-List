import Component from "../core/Component.js";
import { FILTER_TYPE } from "../utils/constants.js";
import { filteredTodoList } from "../utils/filter.js";
import {
    changeFilter,
    deleteAllTodo,
    getFilter,
    getSelectedUserTodoList,
} from "../store/todo/creator.js";

const renderTodoCount = (todos, filter) => {
    const count = filteredTodoList(filter, todos).length;
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
        const todos = getSelectedUserTodoList();
        const filter = getFilter();
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
            this.changeFilterType(event);
        })
    }

    changeFilterType(event) {
        const filter = event.target.className;
        changeFilter(filter);
        this.render();
    }

    onClickDeleteAllButton() {
        this.addEvent('click', '.clear-completed', (event) => {
            this.deleteAllTodo();
        })
    }

    deleteAllTodo() {
        if (!confirm('정말 삭제하시겠습니까?')) { return; }
        deleteAllTodo();
    }
}