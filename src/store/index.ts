import { configureStore } from '@reduxjs/toolkit'
import userInfo from './models/userInfo'

const store = configureStore({
    reducer:{
        userInfo
    }
})

// 推导出整个 store 的类型
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store