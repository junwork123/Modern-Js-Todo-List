import { observable } from "./observer.js";

export const createStore = (reducer) => {
    // 스토어를 생성한다.
    // 스토어는 상태를 관리하고, 상태를 변경하는 기능을 가진다.

    // reducer 가 실행될 때
    // 반환하는 객체 State 를 Observable 로 만든다.
    const state = observable(reducer());

    // state 를 변경할 수 없도록 한 frozenState 를 만든다.
    const frozenState = {};
    Object.keys(state).forEach(key => {
        Object.defineProperty(frozenState, key, {
            get: () => state[key]
        });
    });
    const dispatch = (action) => {
        // 액션을 실행한다.
        // 액션을 실행하면 reducer 가 실행되고,
        // reducer 가 반환하는 객체를 state 에 할당한다.
        for (const [key, value] of Object.entries(reducer(state, action))) {
            if(!state[key]) continue;
            state[key] = value;
        }
    }

    // frozenState 를 반환하는 getState 함수를 만든다.
    const getState = () => frozenState;

    return { getState, dispatch };
}