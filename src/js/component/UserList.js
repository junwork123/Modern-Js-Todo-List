import Component from "../core/Component.js";
import {
    createUser,
    deleteUser,
    selectUser,
    getUserList,
    getSelectedUser,
    isUserExist,
    isUserNotExist,
} from "../store/user/creator.js";
const setActiveUser = (isSelected) => {
    return isSelected ? 'active' : '';
}
const UserListItem = (user, isSelected) => {
    return `
        <button class='ripple ${setActiveUser(isSelected)}' data-username="${user.name}">
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
        const users = getUserList();
        const selectedUser = getSelectedUser();
        return `
            <div id="user-list">
                ${ users && users.map( (user) => 
                    UserListItem(user, selectedUser === user.name)
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
        this.clickUserItem();
    }

    clickDeleteButton() {
        this.addEvent('click', '.user-delete-button', (event) => {
            return this.deleteUser();
        });
    }

    deleteUser() {
        const userName = prompt('삭제하고 싶은 이름을 입력해주세요')

        if (!userName) {
            alert('이름을 반드시 입력해야 합니다.');
            return false;
        }
        if (userName.length < 2) { // 제시된 제약조건
            alert('사용자 이름은 2글자 이상이어야 합니다.');
            return false;
        }
        if (isUserNotExist(userName)) {
            alert('존재하지 않는 이름입니다.');
            return false;
        }
        deleteUser(userName);
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
            if (isUserExist(userName)) {
                alert('이미 존재하는 이름입니다.');
                return false;
            }

            createUser(userName);
        });
    }
    clickUserItem() {
        this.addEvent('click', '#user-list .ripple', (event) => {
            this.createUser(event);
        });
    }

    createUser(event) {
        const selectedUser = getSelectedUser();
        const userName = event.target.dataset.username;
        if (selectedUser.name === userName) {
            return;
        }
        selectUser(userName);
    }
}