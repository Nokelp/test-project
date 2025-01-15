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
    code: number
    msg: string
    data: {
        list: RoleItem[]
        total: number
        totalPage: 1
    }
}