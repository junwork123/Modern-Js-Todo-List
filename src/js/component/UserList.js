import Component from "../core/Component.js";
import {store} from "../store/index.js";
import {createUser, deleteUser} from "../store/user/creator.js";

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
        this.clickCreateButton();
        this.clickDeleteButton();
    }

    clickDeleteButton() {
        this.addEvent('click', '.user-delete-button', (event) => {
            const userName = prompt('삭제하고 싶은 이름을 입력해주세요')

            if (!userName) {
                alert('이름을 반드시 입력해야 합니다.');
                return false;
            }
            if (userName.length < 2) { // 제시된 제약조건
                alert('사용자 이름은 2글자 이상이어야 합니다.');
                return false;
            }
            if (this.isUserNotExist(userName)) {
                alert('존재하지 않는 이름입니다.');
                return false;
            }

            this.deleteUser(userName);
        });
    }

    clickCreateButton() {
        this.addEvent('click', '.user-create-button', (event) => {
            const userName = prompt('추가하고 싶은 이름을 입력해주세요')

            if (!userName) {
                alert('이름을 반드시 입력해야 합니다.');
                return false;
            }
            if (userName.length < 2) { // 제시된 제약조건
                alert('사용자 이름은 2글자 이상이어야 합니다.');
                return false;
            }
            if (this.isUserExist(userName)) {
                alert('이미 존재하는 이름입니다.');
                return false;
            }

            this.createUser(userName);
        });
    }

    getUsers() {
        const { users } = store.getState();
        if (users) { return users; }
        return [];
    }
    isUserExist(userName) {
        const users = this.getUsers();
        return users.find(user => user.name === userName);
    }
    isUserNotExist(userName) {
        return !this.isUserExist(userName);
    }
    createUser(userName) {
        store.dispatch(createUser(userName));
    }
    deleteUser(userName) {
        if(this.isUserNotExist(userName)){ return false; }
        store.dispatch(deleteUser(userName));
    }
}