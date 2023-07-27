import { createSlice } from '@reduxjs/toolkit'

export const memberSlice = createSlice({
    name: 'member',
    initialState: {
        login: 0
    },
    reducers: {
        loginAction: (state) => {
           state.login = 1;
        },
        logout: (state) => {
           state.login = 0;
        },
    }
})

// Action creators are generated for each case reducer function
export const { loginAction, logout } = memberSlice.actions

export default memberSlice.reducer