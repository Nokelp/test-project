import axios from "axios"
import type {
  CaptchaRes,
  LoginRes,
  LoginResData,
  InfoRes,
  RoleRes,
  UserListParams,
  UserListRes,
 } from "../types"


axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/bwapi' : 'https://zyxcl.xyz/exam_api'

// 验证码
export const getCaptchaApi = () => {
  return axios.get<CaptchaRes>('/login/captcha')
}

// 登录
export const getLoginApi = (params: LoginRes) => {
  return axios.post<LoginResData>('/login', params)
}

// 个人信息
export const getInfoApi = () => {
  return axios.get<InfoRes>('/user/info',{
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

// 角色列表
export const getRoleListApi = () => {
  return axios.get<RoleRes>('role/list',{
    headers: {
      Authorization: localStorage.getItem('token')
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