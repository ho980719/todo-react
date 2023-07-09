// **** 초기상태 정의
import {createSlice, createStore} from "@reduxjs/toolkit";
const initialState = {
    title: '',
};

/* 액션 타입 정의 */
// 액션 타입은 주로 대문자로 작성합니다.
const SET_TITLE = 'SET_TITLE';

/* 액션 생성함수 정의 */
// 액션 생성함수는 주로 camelCase 로 작성합니다.
const setTitle = title => ({
    type : SET_TITLE,
    title
});

/* 리듀서 만들기 */
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여
// 새로운 상태를 만드는 함수를 만들어봅시다.
// 주의: 리듀서에서는 불변성을 꼭 지켜줘야 합니다!

function reducer(state = initialState, action) {
    // state 의 초깃값을 initialState 로 지정했습니다.
    switch (action.type) {
        case SET_TITLE:
            return {
                ...state,
                text: action.title
            };
        default:
            return state;
    }
}

/* 스토어 만들기 */
const store = createStore(reducer);

console.log(store.getState()); // 현재 store 안에 들어있는 상태를 조회합니다.

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
    const state = store.getState();
    console.log(state);
};

let note = createSlice({
    name : 'note',
    initialState: initialState,
    // reducers: {
    //     setTitle()
    // }
})
