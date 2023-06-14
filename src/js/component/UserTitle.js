import Component from "../core/Component.js";
import { getSelectedUser } from "../store/user/creator.js";

export default class UserTitle extends Component {
    template () {
        const selectedUser = getSelectedUser();
        return `
            <span><strong>${selectedUser}</strong>'s Todo List</span>
        `
    }
}