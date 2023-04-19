import { GET_USERS } from "./user/actions.js";


let initialState = {
    users: [],
}
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        // USER REDUCER
        case GET_USERS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export default reducer;