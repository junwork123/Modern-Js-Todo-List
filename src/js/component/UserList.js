import Component from "../core/Component.js";
import {store} from "../store/index.js";
import { createUser } from "../store/user/creator.js";

const UserListItem = (user) => {
    return `
        <button class='ripple'>
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
        const { users } = store.getState();
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
        this.addEvent('click', '.user-create-button', (event) => {
            const userName = prompt('추가하고 싶은 이름을 입력해주세요')

            if (!userName) {
                alert('이름을 반드시 입력해야 합니다.');
            }

            if (userName.length < 2) { // 제시된 제약조건
                alert('사용자 이름은 2글자 이상이어야 합니다.');
            }

            this.createUser(userName);
            event.stopImmediatePropagation();
        });

        this.addEvent('click', '.user-delete-button', () => {

        });
    }
    createUser(userName) {
        store.dispatch(createUser(userName));
    }
    deleteUser(event) {}
}