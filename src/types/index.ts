// 验证码图片
export type CaptchaRes = {
    code: number
    msg: string
    data:{
        code: string
    }
}

// 登录参数
export type LoginRes = Record<'username' | 'password' | 'code', string>

// 登陆返回值
export type LoginResData = {
    code: number
    msg: string
    data:{
        token: string
    }
}

// 个人信息、
export type InfoItem = {
    createTime: number
    disabled: boolean
    isBtn: boolean
    name: string
    path: string
    pid: string
    __v: number
    _id: string
}
export type InfoData = {
    permission: InfoItem[]
    role: []
    username: string
    _id: string
}
export type InfoRes = {
    code: number
    msg: string
    data: InfoData
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
    code: number
    msg: string
    data: {
        list: RoleItem[]
        total: number
        totalPage: 1
    }
}

// 用户管理列表入参格式
export type UserListParams = {
    page: number
    pageSize: number
}

// 用户管理列表返回值
export type ListItem = {
    creator: string
    lastOnlineTime: number
    password: string
    role: []
    status: number
    username: string
    __v: number
    _id: string
}

export type UserListRes = {
    code: number
    msg: string
    data: {
        totalPage: number
        total: number
        list: ListItem[]
    }
}