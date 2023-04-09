export default class Store{
    constructor() {
        this.storage = localStorage;
    }
    // Nullish coalescing operator (??) 사용
    getTodos = () => JSON.parse(this.storage.getItem('todos')) ?? [];
    setTodos = (todos) => this.storage.setItem('todos', JSON.stringify(todos));
}