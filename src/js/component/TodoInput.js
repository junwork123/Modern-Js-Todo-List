import Component from "../core/Component.js";
import { store } from "../store/index.js";
import { createTodo } from "../store/todo/creator.js";

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
      const content = event.target.value;
      if (event.key === "Enter" && content) {
        this.createTodoItem(content);
        event.target.value = "";
        event.stopImmediatePropagation();
      }
    });
  }

  createTodoItem(content) {
    store.dispatch(createTodo(content));
  }
}