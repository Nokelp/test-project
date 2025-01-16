import axios from "axios"
import type {
  AxiosRes,
  BaseRes,
  CaptchaRes,
  LoginRes,
  LoginResData,
  InfoData,
  ClassListData,
  StudentListData,
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
  return request.get<AxiosRes<MenuRes>>('/user/menulist', {
  })
}
// 退出登录
export const getLogoutApi = () => {
  return request.get('/user/logout')
}

// 角色列表
export const getRoleListApi = () => {
  return request.get<AxiosRes<RoleRes>>('role/list',{
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
  return request.get<BaseRes<ClassListData>>('/studentGroup/list',{
    params: {
      page: 1,
      pagesize: 10
    },
  })
}
//学生列表

export const getstudentListApi = ( params:{page:number,pagesize:number}) => {
  return request.get<BaseRes<StudentListData>>('/student/list',{
    params,
  })
}

// 新增角色
export const getCreateRoleApi = (params:{name: string, value: string}) => {
  return request.get('/role/create',{
    params,
  })
}
  
