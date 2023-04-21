import {
    GET_USERS,
    CREATE_USER,
    DELETE_USER,
} from "./user/actions.js";


let initialState = {
    users: [],
}
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.payload,
            }
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.name !== action.payload.name),
            }
        default:
            return state;
    }
}

export default reducer;