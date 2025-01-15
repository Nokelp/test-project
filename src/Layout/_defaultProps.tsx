import {
    ChromeFilled,
    CrownFilled,
    SmileFilled,
    TabletFilled,
    TeamOutlined,
    FileTextOutlined,
  } from '@ant-design/icons';
  
  export default {
    route: {
      path: '/',
      routes: [
        {
          path: '/welcome',
          name: '欢迎',
          icon: <SmileFilled />,
          component: './Welcome',
        },
        {
          path: '/admin',
          name: '管理页',
          icon: <CrownFilled />,
          access: 'canAdmin',
          component: './Admin',
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
          path: '/manage-group/',
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
              path: '/admin/sub-page2',
              name: '二级页面',
              icon: <CrownFilled />,
              component: './Welcome',
            },
            {
              path: '/admin/sub-page3',
              name: '三级页面',
              icon: <CrownFilled />,
              component: './Welcome',
            },
          ],
        },
        {
          path: '/systemManage',
          name: '系统管理',
          icon: <CrownFilled />,
          routes: [
            {
              path: '/list/sub-page',
              name: '列表页面',
              icon: <CrownFilled />,
              routes: [
                {
                  path: 'sub-sub-page1',
                  name: '一一级列表页面',
                  icon: <CrownFilled />,
                  component: './Welcome',
                },
                {
                  path: 'sub-sub-page2',
                  name: '一二级列表页面',
                  icon: <CrownFilled />,
                  component: './Welcome',
                },
                {
                  path: 'sub-sub-page3',
                  name: '一三级列表页面',
                  icon: <CrownFilled />,
                  component: './Welcome',
                },
              ],
            },
            {
              path: '/list/sub-page2',
              name: '二级列表页面',
              icon: <CrownFilled />,
              component: './Welcome',
            },
            {
              path: '/list/sub-page3',
              name: '三级列表页面',
              icon: <CrownFilled />,
              component: './Welcome',
            },
          ],
        },
        {
          path: '/paper',
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
    location: {
      pathname: '/',
    },
  };