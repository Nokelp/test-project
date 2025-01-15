import axios from "axios"
import type {
  AxiosRes,
  CaptchaRes,
  LoginRes,
  LoginResData,
  InfoRes,
  RoleRes,
  MenuRes,
  UserListParams,
  UserListRes,
 } from "../types"


// 配置axios的基础路径
axios.defaults.baseURL =  process.env.NODE_ENV === 'development' ? '/bwapi' : 'https://zyxcl.xyz/exam_api'


// 验证码
export const getCaptchaApi = () => {
  return axios.get<AxiosRes<CaptchaRes>>('/login/captcha')
}

// 登录
export const getLoginApi = (params: LoginRes) => {
  return axios.post<AxiosRes<LoginResData>>('/login', params)
}

// 个人信息
export const getInfoApi = () => {
  return axios.get<AxiosRes<InfoRes>>('/user/info',{
    headers: {
      Authorization: localStorage.getItem('token') || ''
    }
  })
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

// 用户管理列表
export const getUserListApi = (params: UserListParams) => {
  return axios.get<UserListRes>('/user/list', {
    params,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}