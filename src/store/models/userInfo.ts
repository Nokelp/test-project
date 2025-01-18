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
    info: InfoData | null
    menuList: MenuItem[]
    userModalOpen: boolean
    loading:boolean
    isAddUser: boolean
}

const initialState: UserInfo = {
    info: null,
    menuList: [],
    userModalOpen: false,
    loading:false,
    isAddUser: false,
}


const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers:{
        // 添加/编辑用户弹窗开关
        changeModalOpen(state, actions) {
            state.userModalOpen = actions.payload
        },
        // 是否是新增用户操作
        isAdd(state, actions) {
            state.isAddUser = actions.payload
        },
        updateInfo(state, actions) {
            state.info = actions.payload
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getInfo.fulfilled, (state, {payload}) => {
            state.info = payload.info
            state.menuList = payload.menuList
            console.log('~~~~~~~~~~~~',payload.info,payload.menuList)
        })
    }
}) 

export const { changeModalOpen, isAdd, updateInfo } = infoSlice.actions

export default infoSlice.reducer