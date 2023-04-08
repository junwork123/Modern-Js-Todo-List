
export default class App {
    constructor() {
        this.$todoList = document.querySelector('.todo-list');
        this.$todoCount = document.querySelector('.todo-count strong');
        this.loadTodo();
    }
    todoTemplate = ({ id, title, completed }) => {
        return `<li id=${id} class=${completed && 'completed'} >
                <div class="view">
                    <input class="toggle" type="checkbox" 
                      id=${id} ${completed && 'checked'} />
                    <label class="label">${title}</label>
                    <button class="destroy" id=${id}></button>
                </div>
                <input class="edit" value="${title}" />
            </li>`;
    };

    viewAll = () => {
        this.todos.map((todo) => {
            // insertAdjacentHTML는 DOM을 새로 그리지 않고 요소를 추가한다.
            this.$todoList.insertAdjacentHTML('beforeend', this.todoTemplate(todo));
        });
    };

    loadTodo = () => {
        this.todos = JSON.parse(localStorage.getItem('todos')) ?? [];
        this.$todoList.innerHTML = '';
        this.viewAll();
        this.$todoCount.innerHTML = this.$todoList.querySelectorAll('li').length;
    }
}

window.onload = () => {
    new App();
};
