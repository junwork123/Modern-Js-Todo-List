import { createStore } from "../core/Store.js";
import userReducer from "./user/userReducer.js";

const userStore = createStore(userReducer);

export { userStore }