import axios from "axios"
import type {
  CaptchaRes,
  LoginRes,
  LoginResData,
  InfoRes,
  classListRes,
  studentListRes
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
  
//班级列表
export const getClassListApi = () => {
  return axios.get<classListRes>('/studentGroup/list',{
    params: {
      page: 1,
      pagesize: 10
    },
    headers: {
      Authorization: localStorage.getItem('token') 
    }
  })
}
//学生列表

export const getstudentListApi = ( params:{page:number,pagesize:number}) => {
  return axios.get<studentListRes>('/student/list',{
    params,
    headers: {
      Authorization: localStorage.getItem('token') 
    }
  })
}