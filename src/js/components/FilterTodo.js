import { ALL, ACTIVE, COMPLETED } from "../contant/TodoStatus.js";

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
        let filter = ALL;
        if (target.classList.contains(ACTIVE)){ filter = ACTIVE; }
        if (target.classList.contains(COMPLETED)){ filter = COMPLETED; }
        this.$filters.querySelector('.selected').classList.remove('selected');
        target.classList.add('selected');
        this.viewTodo.render(filter);
    };
}