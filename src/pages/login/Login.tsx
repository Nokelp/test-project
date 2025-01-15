import React, { useEffect, useState } from 'react'
import logstyle from './Login.module.scss'
import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons'
import {
    LoginForm,
    ProConfigProvider,
    ProFormText,
} from '@ant-design/pro-components'
import { message, theme } from 'antd'
import style from './Login.module.scss'
import { getCaptchaApi, getLoginApi } from '../../services'
import { LoginRes } from '../../types'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const { token } = theme.useToken();
  const [codImg, setCodeImg] = useState('')
  const navigate = useNavigate()
  
  const onFinish = async(values: LoginRes) => {
    try {
      const res = await getLoginApi(values)
      console.log(res.data.code) 
      if(res.data.code === 200){
        message.success('登录成功')
        localStorage.setItem('token', res.data.data.token)
        navigate('/')
      }else if(res.data.code === 1005){
        message.error('验证码过期')
        getCaptcha()
      }else{
        message.error(res.data.msg)
      }
    }catch(e){
      console.log(e)
    }
  };

  const getCaptcha = async () => {
    try {
      const res = await getCaptchaApi() 
      console.log(res.data)
      setCodeImg(res.data.data.code)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    getCaptcha()
  },[])

  return (
    <ProConfigProvider hashed={false} >
      <div className={logstyle.login}>
        <LoginForm
          title="OnlineExam"
          subTitle="在线考试平台"
          onFinish={onFinish}
        >
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText:
                    '密码由数字、字母和特殊字符组成，长度至少为8个字符',
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return 'ok';
                      }
                      if (value && value.length > 6) {
                        return 'pass';
                      }
                      return 'poor';
                    };
                    const status = getStatus();
                    if (status === 'pass') {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          强度：中
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          强度：强
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>强度：弱</div>
                    );
                  },
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
              <div className={style.code}>
                <ProFormText
                  name="code"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'验证码'}
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码!',
                    },
                  ]}
                />
                <div className={style.codeImg}>
                  <img src={codImg} alt="" />
                </div>
              </div>
            </>
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  )
}

export default Login