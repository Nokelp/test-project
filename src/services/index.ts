import axios from "axios"
import type {
  AxiosRes,
  BaseRes,
  CaptchaRes,
  LoginRes,
  LoginResData,
  InfoData,
  classListData,
  studentListData,
  RoleRes,

  MenuRes,
  UserListParams,
  UserListRes,
} from "../types"
import request from "./request"


// 验证码
export const getCaptchaApi = () => {
  return request.get<BaseRes<CaptchaRes>>('/login/captcha')
}


// 登录
export const getLoginApi = (params: LoginRes) => {
  return request.post<BaseRes<LoginResData>>('/login', params)
}

// 个人信息
export const getInfoApi = () => {
  return request.get<BaseRes<InfoData>>('/user/info')
}

// 当前用户菜单
export const getUserMenuListApi = () => {
  return axios.get<AxiosRes<MenuRes>>('/user/menulist', {
    headers: {
      Authorization: localStorage.getItem('token') || ''
    }
  })
}


// 角色列表
export const getRoleListApi = () => {
  return axios.get<AxiosRes<RoleRes>>('role/list',{
    headers: {
      Authorization: localStorage.getItem('token') || ''
    }
  })
}


//用户管理列表
export const getUserListApi = (params: UserListParams) => {
  return request.get<UserListRes>('/user/list', {
    params,
  })
}
  
//班级列表
export const getClassListApi = () => {
  return request.get<BaseRes<classListData>>('/studentGroup/list',{
    params: {
      page: 1,
      pagesize: 10
    },
  })
}
//学生列表

export const getstudentListApi = ( params:{page:number,pagesize:number}) => {
  return request.get<BaseRes<studentListData>>('/student/list',{
    params,
  })
}

// 新增角色
export const getCreateRoleApi = (params:{name: string, value: string}) => {
  return axios.get('/role/create',{
    params,
    headers: {
      Authorization: localStorage.getItem('token') || ''
    }
  })
}
  
