import axios from "axios";
import { message } from "antd";

//根据环境变量配置请求的基础路径
export const baseURL = process.env.NODE_ENV === 'development'?'/bwapi':'https://zyxcl.xyz/exam_api'

const request = axios.create({
    baseURL,
    timeout: 5000
})

//请求拦截，统一处理公告参数，例如：token
request.interceptors.request.use(config => {
    //统一添加token
    // console.log('请求接口之前执行此函数', config)
    config.headers.Authorization = localStorage.getItem('token') || ''
    return config
},function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截，统一处理错误信息，例如：401、403
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
// 超出 2xx 范围的状态码都会触发该函数。
// 对响应错误做点什么
    console.log('响应拦截', error)
    if (error.status === 401) {
        message.error('用户登录信息失效，请重新登录！')
        window.location.href='/user/login'
    } else {
        message.error(error.message)
    }
    return Promise.reject(error);
});

export default request
