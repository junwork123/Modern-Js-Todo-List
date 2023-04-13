import { $ } from "./utils/selector.js";
import { TODO_BUTTONS } from "./utils/constants.js";
import { store, addTodo } from "./store/todoStore.js";
import Component from "./core/Component.js";
export default class TodoApp extends Component {
  template() {
    const { id, title, completed } = this.$props;
    return `<li id=${id} class=${completed && TODO_BUTTONS.COMPLETED} >
                <div class="view">
                    <input class="toggle" type="checkbox" 
                      id=${id} ${completed && 'checked'} />
                    <label class="label">${title}</label>
                    <button class="destroy" id=${id}></button>
                </div>
                <input class="edit" value="${title}" />
            </li>`;
  }
  setEvent() {

  }
}