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