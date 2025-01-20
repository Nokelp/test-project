import Home from "../pages/home/Home"
import Login from "../pages/login/Login"

import NotFound from "../pages/notfound/NotFound"
import Layout from "../Layout/Layout"
//考试管理
import Record from "../pages/test/record/Record"
import Create from "../pages/test/create/Create"
//班级管理
import Groupclass from "../pages/user/group-class/Groupclass"
import Groupdetail from "../pages/user/group-detail/Groupdetail"
import Grouplist from "../pages/user/group-list/Grouplist"
import Groupstudents from "../pages/user/group-students/Groupstudents"
//系统管理
import ManagePage from "../pages/role/manage-page/Managepage"
import MenuManage from "../pages/role/menuManage/MenuManage"
import System from "../pages/role/system/System"
import Personal from "../pages/role/personal/Personal"
//题库管理
import ItemBank from "../pages/question/item-bank/ItemBank"
import CreateItem from "../pages/question/create- item/CreateItem"
//试卷管理
import Paperbank from "../pages/examination/paper-bank/PaperBank"
import CreatePaper from "../pages/examination/create-paper/CreatePaper"
import { Navigate } from "react-router-dom"
import PrivateRoute from "./PrivateRoute "

type Route = {
    path: string,
    element: React.ReactNode,
    layout?: boolean,
    permission?: boolean
}
const  routes:Route[]=[
    {
        path: '/',
        element: <Home />,
        layout: true,
    },
    // 考试管理
    {
        path: '/exam',
        element: <></>,
        layout: true,

    },
    {
        path: '/exam/record',
        element: <Record />,
        layout: true,
        permission: true
    },
    {
        path: '/exam/create',
        element: <Create />,
        layout: true,
        permission: true
    },
    // 试题管理
    {
        path: '/question',
        element: <></>,
        layout: true,
    },
    {
        path: '/question/item-bank',
        element: <ItemBank />,
        layout: true,
        permission: true
    },
    {
        path: '/question/create-item',
        element: <CreateItem />,
        layout: true,
        permission: true
    },
    // 系统管理
    {
        path: '/userManage',
        element: <></>,
        layout: true,
    },
    {
        path: '/userManage/manage-page',  // 用户管理
        element: <ManagePage />,
        layout: true,
        permission: true
    },
    {
        path: '/userManage/menuManage',  // 权限管理
        element: <MenuManage />,
        layout: true,
        permission: true
    },
    {
        path: '/userManage/system',  // 角色管理
        element: <System />,
        layout: true,
        permission: true
    },
    {
        path: '/userManage/personal', //个人信息
        element: <Personal />,
        layout: true,
        permission: true
    },
    {
        path: '/userManage/userOptions', //用户管理
        element: <ManagePage />,
        layout: true,
        permission: true
    },
    // 试卷管理
    {
        path: '/paper',
        element: <></>,
        layout: true,
    },
    {
        path: '/paper/paper-bank',
        element: <Paperbank />,
        layout: true,
        permission: true
    },
    {
        path: '/paper/create-paper',
        element: <CreatePaper />,
        layout: true,
        permission: true
    },
    // 班级管理
    {
        path: '/manage-group',
        element: <></>,
        layout: true,
    },
    {
        path: '/manage-group/group-list',
        element: <Grouplist />,
        layout: true,
        permission: true
    },
    {
        path: '/manage-group/group-students',
        element: <Groupstudents />,
        layout: true,
        permission: true
    },
    {
        path: '/manage-group/group-class',
        element: <Groupclass />,
        layout: true,
        permission: true
    },
    {
        path: '/group-detail/:id',
        element: <Groupdetail />,
        layout: true,
        permission: true
    },
    {
        path: '/systemManage/manage-page',
        element: <ManagePage />,
        layout: true,
        permission: true
    },
    {
        path: '/systemManage/menuManage',
        element: <MenuManage />,
        layout: true,
        permission: true
    },
    {
        path: '/systemManage/system',
        element: <System />,
        layout: true,
        permission: true
    },
    {
        path: '/user/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <NotFound />,
    }
]


 const routerConfig = routes.map(route => {
    if (route.layout) {
        route.element = <Layout>{route.element}</Layout>
    }
    if (route.permission) {
    route.element = <PrivateRoute>{route.element}</PrivateRoute>
    }
    return route
})

export default routerConfig
