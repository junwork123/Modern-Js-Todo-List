import {
    GET_USERS,
} from './actions.js'

const getUsers = (users) => {
    return {
        type: GET_USERS,
        payload: {
            users,
        },
    }
}

export { getUsers }