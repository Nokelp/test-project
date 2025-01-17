import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getInfoApi, getUserMenuListApi } from "../../services"
import { InfoData, MenuItem } from "../../types"

export const getInfo = createAsyncThunk('info/getInfo',async() =>{
    const [UserInfoRes, menulistRes] = await Promise.all([getInfoApi(), getUserMenuListApi()])
    
    return {
        info: UserInfoRes.data.data,
        menuList: menulistRes.data.data.list
    }
})

interface UserInfo{
    info: InfoData | null,
    menuList: MenuItem[],
    userModalOpen: boolean
    loading:boolean
}

const initialState: UserInfo = {
    info: null,
    menuList: [],
    userModalOpen: false,
    loading:false
}


const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers:{
        changeModalOpen(state, actions) {
            state.userModalOpen = actions.payload
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getInfo.fulfilled, (state, {payload}) => {
            state.info = payload.info
            state.menuList = payload.menuList
        })
    }
}) 

export const { changeModalOpen } = infoSlice.actions

export default infoSlice.reducer