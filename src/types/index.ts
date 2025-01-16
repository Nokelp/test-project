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
export type createUserParams = Pick<ListItem, 'username' | 'password' | 'status'>

// 编辑用户入参格式
export type updateUserParams = Partial<Omit<ListItem, 'creator' | 'lastOnlineTime'>> & {id: string}