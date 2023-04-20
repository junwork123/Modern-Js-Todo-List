import { $ } from "./utils/selector.js";
import { UserList } from "./component/index.js";
export default class TodoApp {
    constructor($target) {
        this.$target = $target;
        this.setup();
    }
    setup () {
      const userListTarget =$('#user-list');
      new UserList(userListTarget);
    }
}