import { FILTER_TYPE, TODO_BUTTONS } from "../utils/constants.js";

export default class FilterTodo {
    constructor($filters, viewTodo) {
        this.$filters = $filters;
        this.viewTodo = viewTodo;
        this.mount();
    }
    mount() {
        this.$filters.addEventListener('click', this.filterTodo.bind(this));
    }

    filterTodo = ({ target }) => {
        this.$filters.querySelector('.selected').classList.remove(TODO_BUTTONS.SELECTED);
        target.classList.add(TODO_BUTTONS.SELECTED);
        this.viewTodo.render(this.getFilter(target));
    };

    getFilter = (target) => {
        if (target.classList.contains(FILTER_TYPE.ACTIVE)){ return FILTER_TYPE.ACTIVE; }
        if (target.classList.contains(FILTER_TYPE.COMPLETED)){ return FILTER_TYPE.COMPLETED; }
        return FILTER_TYPE.ALL;
    }
}