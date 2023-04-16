import Component from "../core/Component";
import { userStore } from "../store";
const UserListItem = (user) => {
    return `
        <button class='ripple'
            ${user.name}
        </button>
    `
}

export default class UserList extends Component {
    initState () { return {}; }
    mounted () {
        // 컴포넌트가 마운트된 후에 동작한다.
    }
    template () {
        const { users } = userStore.getState();
        return `
            <div id="user-list">
                ${ users && users.map( (user) => 
                    UserListItem(user)
                )}
                <button class="ripple user-create-button" data-action="createUser">
                    + 유저 생성
                </button>
                <button class="ripple user-delete-button" data-action="deleteUser">
                    삭제 -
                </button>
            </div>
        `
    }
    setEvent () {

    }
}