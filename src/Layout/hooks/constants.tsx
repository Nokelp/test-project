import {
  CrownFilled,
  SmileFilled,
  FileTextOutlined,
  FormOutlined,
  TeamOutlined,
  CopyOutlined
} from '@ant-design/icons'
import React from 'react'

export const MenuIcon: {[k: string]: React.ReactNode} = {
    '考试管理': <FormOutlined />,
    '班级管理': <TeamOutlined />,
    '系统管理': <CrownFilled />,
    '试卷管理': <FileTextOutlined />,
    '试题管理': <CopyOutlined />,
}

export const defaultRoute = [
  {
    path: '/',
    name: '首页',
    icon: <SmileFilled />,
  },
]