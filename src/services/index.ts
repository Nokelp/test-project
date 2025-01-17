import type {
  AxiosRes,
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
  createUserParams,
  createUserRes,
  ExamRecordRes,
  updateUserParams,
  SubjectRes
} from "../types"
import request from "./request"


// 验证码
export const getCaptchaApi = () => {
  return request.get<AxiosRes<CaptchaRes>>('/login/captcha')
}


// 登录
export const getLoginApi = (params: LoginRes) => {
  return request.post<AxiosRes<LoginResData>>('/login', params)
}

// 退出登录
export const getLogoutApi = () => {
  return request.post<AxiosRes<LoginResData>>('/user/logout',{})
}

// 个人信息
export const getInfoApi = () => {
  return request.get<AxiosRes<InfoData>>('/user/info')
}

// 当前用户菜单
export const getUserMenuListApi = () => {
  return request.get<AxiosRes<MenuRes>>('/user/menulist', {
  })
}


// 角色列表
export const getRoleListApi = () => {
  return request.get<AxiosRes<RoleRes>>('role/list',{
  })
}


//用户管理列表
export const getUserListApi = (params: UserListParams) => {
  return request.get<AxiosRes<UserListRes>>('/user/list', {
    params,
  })
}

//班级列表
export const getClassListApi = () => {
  return request.get<AxiosRes<ClassListData>>('/studentGroup/list',{
    params: {
      page: 1,
      pagesize: 10
    },
  })
}

//学生列表
export const getstudentListApi = ( params:{page:number,pagesize:number}) => {
  return request.get<AxiosRes<StudentListData>>('/student/list',{
    params,
  })
}

// 新增角色
export const getCreateRoleApi = (params:{name: string, value: string}) => {
  return request.post<AxiosRes<LoginResData>>('/role/create',params)
}

// 删除角色
export const getRemoveRoleApi = (params: {id: string}) => {
  return request.post<AxiosRes<LoginResData>>('/role/remove',params)
}

// 考试记录
export const getExaminationApi = (params: {page: number, pagesize: number}) => {
  return request.get<AxiosRes<ExamRecordRes>>('/examination/list',{
    params
  })
}

// 创建用户
export const createUserApi = (params: createUserParams) => {
  return request.post<createUserRes>('/user/create', params)
}

// 编辑用户
export const UpdateUserApi = (params: updateUserParams) => {
  return request.post<createUserRes>('/user/update', params)
}

// 删除用户
export const RemoveUserApi = (params: { id: string }) => {
  return request.post<createUserRes>('/user/remove', params)
}

// 创建考试
export const createExamApi = (params: {name: string, time: number}) => {
  return request.post<createUserRes>('/examination/create', params)  
}

// 监考人
export const getInvigilateApi = () => {
  return request.get<AxiosRes<UserListRes>>('/user/list')
}

// 考试科目
export const getSubjectApi = () => {
  return request.get<AxiosRes<SubjectRes>>('/classify/list')
}
