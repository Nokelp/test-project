import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// export const getFood = createAsyncThunk('food/getFood',async (state,action) =>{
// })


const foodSlice = createSlice({
    name: 'food',
    initialState:{},
    reducers:{},
    extraReducers: builder => {
        builder
    }
}) 

export const {  } = foodSlice.actions

export default foodSlice.reducer