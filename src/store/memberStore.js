import { configureStore } from '@reduxjs/toolkit'
import memberReducer from "../slice/memberSlice";

export default configureStore({
    reducer: {
        member: memberReducer
    }
})