import { GET_USERS, CREATE_USER } from "./user/actions.js";


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
        default:
            return state;
    }
}

export default reducer;