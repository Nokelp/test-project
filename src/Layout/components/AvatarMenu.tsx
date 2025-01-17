import React from 'react'
import { Dropdown, MenuProps, message } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getLogoutApi } from '../../services'


const AvatarMenu: React.FC<{children?: React.ReactNode}> = (props) => {
  const navigate = useNavigate()
  const getLogout = async() => {
    const res = await getLogoutApi()
    console.log(res)
    message.success('退出成功')
    localStorage.removeItem('token')
    navigate('/user/login')
  }
  const onClick: MenuProps['onClick'] = ({key}) => {
    if(key === 'logout'){
        getLogout()
    }
}

  return (
    <Dropdown
        menu={{
            items: [
                {
                    key: 'user',
                    icon: <UserOutlined />,
                    label: '个人中心',
                },
                {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                },
            ],
            onClick
        }}
    >
        {props.children}
    </Dropdown>
  )
}

export default AvatarMenu