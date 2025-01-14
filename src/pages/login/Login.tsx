import React, { useState } from 'react'
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
import style  from './Login.module.scss'

const Login: React.FC = () => {
  const { token } = theme.useToken();


  return (
    <ProConfigProvider hashed={false} >
      <div className={logstyle.login}>
        <LoginForm
          title="OnlineExam"
          subTitle="在线考试平台"
          onFinish={(values) => {
            message.success('登录成功！');
          }}
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
                    'Password should contain numbers, letters and special characters, at least 8 characters long.',
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
                <div>
                  <img src="" alt="" />
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