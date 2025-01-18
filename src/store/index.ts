import { configureStore } from '@reduxjs/toolkit'
import userInfo from './models/userInfo'
import classList from './models/classList'
import subjectList from './models/SubjectClassificat'

const store = configureStore({
    reducer:{
        userInfo,
        classList,
        subjectList
    }
})

// 推导出整个 store 的类型
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store