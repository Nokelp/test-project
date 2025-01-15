import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getClassListApi } from "../../services"
import { ClassListData } from "../../types"

export type params={
    page: number,
    pagesize: number
}

export const getClassList = createAsyncThunk('classList/fetch',async(params:params) =>{
    const res = await getClassListApi(params)
    return res.data.data
})

interface ClassList{
    ClassList:ClassListData
}

const initialState: ClassList = {
    ClassList:{} as ClassListData,
}


export const classListSlice = createSlice({
    name: 'classList',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
        .addCase(getClassList.fulfilled, (state, action) => {
            state.ClassList = action.payload
            console.log(state.ClassList)
        })
    }
}) 

// export const {  } =  classListSlice.actions

export default  classListSlice.reducer