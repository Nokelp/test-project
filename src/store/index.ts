import { configureStore } from '@reduxjs/toolkit'
import food from './models/food'

const store = configureStore({
    reducer:{
        food
    }
})

// 推导出整个 store 的类型
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store