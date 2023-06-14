import Component from "../core/Component.js";
import { createTodo } from "../store/todo/creator.js";
import { getSelectedUser } from "../store/user/creator.js";

export default class TodoInput extends Component {
  initState() { return {}; }
  mounted() {
    // 컴포넌트가 마운트된 후에 동작한다.
  }
  template() {
    return `
      <input
          class="new-todo"
          placeholder="할 일을 입력해주세요."
          autofocus
      />
    `;
  }

  setEvent() {
    this.enterTodoItem();
  }

  enterTodoItem() {
    this.addEvent("keydown", ".new-todo", (event) => {
        this.createTodoItem(event);
    });
  }

  createTodoItem(event) {
    const content = event.target.value;
    const isCreateEvent = event.key === "Enter" && content;
    if (!isCreateEvent) { return; }

    const newTodoItem = {
      id: String(Date.now()),
      user: getSelectedUser(),
      content: content,
      completed: false
    };
    createTodo(newTodoItem);

    event.target.value = ""; // input 초기화
  }
}