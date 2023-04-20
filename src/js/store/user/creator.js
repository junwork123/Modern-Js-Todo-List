import {
    GET_USERS,
    CREATE_USER,
} from './actions.js'

const getUsers = (users) => {
    return {
        type: GET_USERS,
        payload: {
            users,
        },
    }
}

const createUser = (name) => {
    return {
        type: CREATE_USER,
        payload: {
            name,
        },
    }
}
export { getUsers, createUser }