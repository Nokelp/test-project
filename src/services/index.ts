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
  ClassListItem,
  MenuRes,
  UserListParams,
  UserListRes,
  createUserParams,
  createUserRes,
  StudentListItem,
  ExamRecordRes,
  updateUserParams,
  SubjectRes,
  ExamClassRes,
  createExamParams,
  QuestionsListRes,
  UpdateUserInfoParams,
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
export const getClassListApi = (params:{page?:number,pagesize?:number,name?:string}={page:1},current?:number) => {
  return request.get<AxiosRes<ClassListData>>('/studentGroup/list',{
    params
  })
}
//查询班级接口


//编辑班级接口
export const editeClassListApi = (params:ClassListItem) => {
  return request.post<BaseRes>('/studentGroup/update',
    params
  )
}
//删除班级接口
export const delClassListApi = (params:{id:string}) => {
  return request.post<BaseRes>('/studentGroup/remove',
    params
  )
}

//学生列表
export const getstudentListApi = ( params:{page:number,pagesize:number}) => {
  return request.get<AxiosRes<StudentListData>>('/student/list',{
    params,
  })
}
//编辑学生
export const editeStudentListApi = (params:StudentListItem) => {
  return request.post<BaseRes>('student/update',
    params
  )
}

//删除xxx学生
export const delStudentListApi = (params:{id:string}) => {
  return request.post<BaseRes>('/student/remove',
    params
  )
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

//创建班级
export const createClassApi = (data:{name: string,classify:string,teacher:string,students:[]}) => {
  return request.post<BaseRes>('/studentGroup/create', data)
}

// 考试班级
export const getStudentGroupApi = () => {
  return request.get<AxiosRes<ExamClassRes>>('/studentGroup/list') 
}

// 试卷列表
export const getQuestionsListApi = (params: {classify: string}) => {
  return request.get('/exam/list',{
    params
  })
}

// 创建考试
export const createExamRecordApi = (params: createExamParams) => {
  return request.post<AxiosRes<LoginRes>>('/examination/create', params)
}

// 试题库
export const getQuestionListApi = (params: {page: number, pagesize: number}) => {
  return request.get<AxiosRes<QuestionsListRes>>('/question/list',{
    params
  })
}

// 删除题目
export const removeQuestionApi = (params: {id: string}) => {
  return request.post<AxiosRes<LoginRes>>('/question/remove', params)
}

// 编辑题目
export const getUpdateQuestionApi = (params: {id: string, question: string }) => {
  return request.post<AxiosRes<LoginRes>>('/question/update', params)
}
// 上传头像
export const UploaderAvatarApi = (params: { avatar: string }) => {
  return request.post<createUserRes>('/profile', params)
}

// 修改个人信息
export const UpdateUserInfoApi = (params: UpdateUserInfoParams) => {
  return request.post<createUserRes>('/user/update/info', params)
}
