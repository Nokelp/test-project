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


export type classListRes = {
    code: number
    msg: string
    data: classListData
  }
  
  export type classListData = {
    list: classListItem[]
    total: number
    totalPage: number
  }
  export type classListItem = {
    _id: string
    classify: string
    name: string
    disabled: boolean
    createTime: number
    creator: string
    students: string[]
    __v: number
  }

  export type studentListRes = {
    code: number
    msg: string
    data: studentListData
  }


  export type studentListData = {
    list: studentListItem[]
    total: number
    totalPage: number
  }

  export type studentListItem = {
    _id: string
    classId: string
    avator: string
    username: string
    disabled: boolean
    createTime: number
    creator: string
    email: string
    exams:[]
    idCard: string
    password: string
    role: string
    sex: '男' | '女'
    status: number
    age: number
    __v: number
  }