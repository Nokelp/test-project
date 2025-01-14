import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getInfoApi } from "../../services"
import { InfoData } from "../../types"

export const getInfo = createAsyncThunk('info/getInfo',async() =>{
    const res = await getInfoApi()
    return res.data.data
})

interface UserInfo{
    info: InfoData
}

const initialState: UserInfo = {
    info: {} as InfoData
}


const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
        .addCase(getInfo.fulfilled, (state, action) => {
           state.info = action.payload
           console.log(action.payload)
       })
    }
}) 

export const {  } = infoSlice.actions

export default infoSlice.reducer