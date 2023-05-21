import Component from "../core/Component.js";
import {store} from "../store/index.js";

export default class UserTitle extends Component {
    template () {
        const { selectedUser } = store.getState();
        return `
            <span><strong>${selectedUser}</strong>'s Todo List</span>
        `
    }
}