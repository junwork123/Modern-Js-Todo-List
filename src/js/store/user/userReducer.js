import { GET_USERS } from "./actions.js";

const initialState = {
    users: [],
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // USER REDUCER
        case GET_USERS:
            return {
                ...state,
                ...payload,
            }
    }
}
export default reducer