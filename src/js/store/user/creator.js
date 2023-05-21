import {
    CREATE_USER,
    DELETE_USER,
    SELECT_USER,
} from './actions.js'

const createUser = (name) => {
    return {
        type: CREATE_USER,
        payload: {
            name,
        },
    }
}

const deleteUser = (name) => {
    return {
        type: DELETE_USER,
        payload: {
            name,
        },
    }
}

const selectUser = (name) => {
    return {
        type: SELECT_USER,
        payload: {
            name,
        },
    }
}
export {
    createUser,
    deleteUser,
    selectUser
}