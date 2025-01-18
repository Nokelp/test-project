export interface AxiosRes<T> {
    code: number
    msg: string
    data: T
}

// 验证码图片
export type CaptchaRes = {
    code: string
}

// 登录参数
export type LoginRes = Record<'username' | 'password' | 'code', string>

// 登陆返回值
export type LoginResData = {
    token: string
}

// 菜单列表
export type MenuItem = {
    createTime: number
    disabled: boolean
    isBtn: boolean
    name: string
    path: string,
    pid: string,
    __v: number,
    _id: string,
    children?: MenuItem[]

}
export type MenuRes = {
    list: MenuItem[]
}

// 个人信息
export type InfoItem = Omit<MenuItem, 'children'>
export type InfoData = {
    permission: InfoItem[]
    role: []
    username: string
    _id: string
    avator?: string
    age?: number
    email?: string
    sex?: string

}
export type InfoRes = InfoData

//学生列表
export type StudentListRes = {
    code: number
    msg: string
    data: StudentListData
}
export type StudentListData = {
    list: StudentListItem[]
    total: number
    totalPage: number
}
export type StudentListItem = {
    age: number
    avator: string
    birthday: number
    class: string
    createTime: number
    creator: string
    email: string
    gender: number
    grade: string
    name: string
    phone: string
    status: number
    __v: number
    _id: string
}


//班级列表
export type ClassListRes = {
    code: number
    msg: string
    data: ClassListData
}
export type ClassListData = {
    list: ClassListItem[]
    total: number
    totalPage: number
}
export type ClassListItem = {
    classify:string
    creator:string
    _id: string
    name: string
    createTime: number
    teacher: string
    students:[]
    __v: number
}
// 角色列表
export type RoleItem = {
    createTime: number
    creator: string
    disabled: boolean
    name: string
    permission: string[]
    value: string
    __v: number
    _id: string
}
export type RoleRes = {
    list: RoleItem[]
    total: number
    totalPage: 1
}

// 用户管理列表入参格式
export type UserListParams = {
    page: number
    pageSize: number
    username?: string,
    creator?: string,
    lastOnlineTime?: number | null,
    status?: 0 | 1,
}

// 用户管理列表返回值
export type ListItem = {
    avator: string
    creator: string
    lastOnlineTime?: number
    password: string
    role: string[]
    status: 0 | 1
    username: string
    __v: number
    _id: string
}

export type UserListRes = {
    totalPage: number
    total: number
    list: ListItem[]
}

// 创建用户入参格式
export type createUserParams = Pick<ListItem, 'username' | 'password' | 'status' | 'role'>

// 创建用户返回值
export type createUserRes = {
    code: number
    msg: string
}
export type BaseRes<T=null> = {
    code: number
    msg: string
    data: T
}

// 考试记录
export type QuestionsListItem = {
    answer: string
    classify: string
    options: string[]
    question: string
    type: string
    __v: number
    _id: string
}
export type ExamRecordItem = {
    classify: string
    createTime: number
    creator: string
    endTime: number
    examId: string
    examiner: string[]
    group: string[]
    name: string
    questionsList: QuestionsListItem[]
    startTime: number
    status: 0 | 1
    __v: number
    _id: string
}
export type ExamRecordRes = {
    list: ExamRecordItem[]
    total: number
    totalPage: number
}

// 编辑用户入参格式
export type updateUserParams = Partial<Omit<ListItem, 'creator' | 'lastOnlineTime'>> & {id: string}

// 监考人
export type InvigilateItem = {
    username: string
    _id: string
}

// 考试科目
export type SubjectItem = {
    createTime: number
    creator: string
    name: string
    value: string
    __v: number
    _id: string
}
export type SubjectRes = {
    list: []
}

// 考试班级
export type ExamClassItem = {
    classify: string
    createTime: number
    creator: string
    name: string
    students: []
    teacher: string
    __v: number
    _id: string
}
export type ExamClassRes = {
    list: ExamClassItem[]
    total: number
    totalPage: number
}

// 创建考试
export type createExamParams = {
    name: string
    classify: string
    examId?: string
    group?: string
    examiner: string
    startTime: string
    endTime: string
}

// 试题库
export type QuestionsListRes = {
    list: QuestionsListItem[]
    total: number
    totalPage: number
}
// 修改个人信息返回值
export type UpdateUserInfoParams = Pick<InfoData, 'username' | 'age' | 'email' | 'sex' | 'avator'>
