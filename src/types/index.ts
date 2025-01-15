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