import {
    CrownFilled,
    SmileFilled,
    FileTextOutlined,
    FormOutlined,
    TeamOutlined,
    CopyOutlined

  } from '@ant-design/icons';
  
  export default {
    route: {
      path: '/',
      routes: [
        {
          path: '/',
          name: '首页',
          icon: <SmileFilled />,
        },
        {
          path: '/exam/record',
          name: '考试管理',
          icon: <FormOutlined />,
          routes: [
            {
              path: '/exam/record',
              name: '考试记录'
            },
            {
              path: '/exam/create',
              name: '创建考试',
            }
          ],
        },
        {
          name: '班级管理',
          icon: <TeamOutlined />,
          path: '/manage-group/group-list',
          routes: [
            {
              path: '/manage-group/group-list',
              name: '班级列表'
            },
            {
              path: '/manage-group/group-students',
              name: '学生列表',
              component: './Welcome',
            },
            {
              path: '/manage-group/group-class',
              name: 'group-class',
              component: './Welcome',
            },
            {
              path: '/manage-group/group-detail/:id',
              name: ':id',
              component: './Welcome',
            },
          ],
        },
        {
          path: '/systemManage/manage-page',
          name: '系统管理',
          icon: <CrownFilled />,
          routes: [
            {
              path: '/systemManage/manage-page',
              name: '用户管理',
              component: './Welcome',
            },
            {
              path: '/systemManage/menuManage',
              name: '权限管理',
              component: './Welcome',
            },
            {
              path: '/systemManage/system',
              name: '角色管理',
              component: './Welcome',
            }
          ],
        },
        {
          path: '/question/item-bank',
          name: '试题管理',
          icon: <CopyOutlined />,
          access: 'canAdmin',
          component: './Admin',
          routes: [
            {
              path: '/question/item-bank',
              name: '试题库',
              component: './Welcome',
            },
            {
              path: '/question/create-item',
              name: '添加试题',
              component: './Welcome',
            }
          ],
        },
        {
          path: '/paper/paper-bank',
          name: '试卷管理',
          icon: <FileTextOutlined />,
          access: 'canAdmin',
          component: './Admin',
          routes: [
            {
              path: '/paper/paper-bank',
              name: '试卷库',
              component: './Welcome',
            },
            {
              path: '/paper/create-paper',
              name: '试卷管理',
              component: './Welcome',
            }
          ],
        },
      ],
    },
  };