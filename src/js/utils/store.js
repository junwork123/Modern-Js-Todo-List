export const getTodos = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}
export const setTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
}