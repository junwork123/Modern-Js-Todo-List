import reducer from "./reducer.js";
import {createStore} from "../core/createStore.js";
const store = createStore(reducer);

export { store };