import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getSubjectApi } from "../../services"
import { ExamClassItem } from "../../types"



export const getSubjectClassList = createAsyncThunk('classList/fetch',async() =>{
    const res = await getSubjectApi()
    return res.data.data.list
})

interface ClassList{
    subjectClassList: ExamClassItem[]
}

const initialState: ClassList = {
    subjectClassList: {} as ExamClassItem[],
}




export const SubjectSlice = createSlice({
    name: 'classList',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
        .addCase(getSubjectClassList.fulfilled, (state, action) => {
            state.subjectClassList = action.payload
        })
    }
}) 


export default  SubjectSlice.reducer