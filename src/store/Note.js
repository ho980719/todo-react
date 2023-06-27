// **** 초기상태 정의
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    title: '',
};

let note = createSlice({
    name : 'note',
    initialState: initialState,
    // reducers: {
    //     setTitle()
    // }
})
