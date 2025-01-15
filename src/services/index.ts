import axios from "axios"
import type {
  BaseRes,
  CaptchaRes,
  LoginRes,
  LoginResData,
  InfoData,
  classListData,
  studentListData
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