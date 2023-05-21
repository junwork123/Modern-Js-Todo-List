import {
    CREATE_USER,
    DELETE_USER,
    SELECT_USER,
} from './actions.js'
import {store} from "../index.js";

const createUser = (name) => {
    store.dispatch({
        type: CREATE_USER,
        payload: {
            name,
        },
    });
}

const deleteUser = (name) => {
    store.dispatch({
        type: DELETE_USER,
        payload: {
            name,
        },
    });
}

const selectUser = (name) => {
    store.dispatch({
        type: SELECT_USER,
        payload: {
            name,
        },
    });
}

const getUserList = () => {
    const { users } = store.getState();
    return users;
}

const getSelectedUser = () => {
    const { selectedUser } = store.getState();
    return selectedUser;
}

const isUserExist = (userName) => {
    const { users } = store.getState();
    return users.find(user => user.name === userName);
}

const isUserNotExist = (userName) => {
    return !this.isUserExist(userName);
}

export {
    createUser,
    deleteUser,
    selectUser,
    getUserList,
    getSelectedUser,
    isUserExist,
    isUserNotExist,
}