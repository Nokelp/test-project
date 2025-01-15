import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getstudentListApi } from "../../services"
import { studentListData } from "../../types"

export type params={
    page: number,
    pagesize: number
}

// export const getstudentList = createAsyncThunk('studentList/fetch',async() =>{
//     const res = await getstudentListApi()
//     return res.data.data
// })

interface studentList{
    studentList:studentListData
}

const initialState: studentList = {
    studentList:{} as studentListData,
}


export const studentListSlice = createSlice({
    name: 'studentList',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
        .addCase(getstudentListApi.fulfilled, (state, action) => {
            state.studentList = action.payload
            console.log(state.studentList)
        })
    }
}) 

// export const {  } =  studentListSlice.actions

export default  studentListSlice.reducer