import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import NotFound from "../pages/notfound/NotFound"
import Layout from "../Layout/Layout"
// 考试管理
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
    islogin?: boolean
}
const  routes:Route[]=[
    {
        path: '/',
        element: <Layout><Home /></Layout>
    },
    // 考试管理
    {
        path: '/exam',
        element: <Navigate to="/exam/record" />
    },
    {
        path: '/exam/record',
        element: <Record />,
        layout: true,
    },
    {
        path: '/exam/create',
        element: <Create />,
        layout: true,
    },
    // 试题管理
    {
        path: '/question',
        element: <Navigate to="/question/item-bank" />
    },
    {
        path: '/question/item-bank',
        element: <ItemBank />,
        layout: true,
    },
    {
        path: '/question/create-item',
        element: <CreateItem />,
        layout: true,
    },
    // 系统管理
    {
        path: '/userManage',
        element: <Navigate to="/userManage/manage-page" />
    },
    {
        path: '/userManage/manage-page',  // 用户管理
        element: <ManagePage />,
        layout: true
    },
    {
        path: '/userManage/menuManage',  // 权限管理
        element: <MenuManage />,
        layout: true
    },
    {
        path: '/userManage/system',  // 角色管理
        element: <System />,
        layout: true
    },
    {
        path: '/userManage/personal', //个人信息
        element: <Personal />,
        layout: true
    },
    {
        path: '/userManage/userOptions', //用户管理
        element: <ManagePage />,
        layout: true
    },
    // 试卷管理
    {
        path: '/paper',
        element: <Navigate to="/paper/paper-bank" />
    },
    {
        path: '/paper/paper-bank',
        element: <Paperbank />,
        layout: true,
    },
    {
        path: '/paper/create-paper',
        element: <CreatePaper />,
        layout: true,
    },
    // 班级管理
    {
        path: '/manage-group',
        element: <Navigate to="/manage-group/group-list" />
    },
    {
        path: '/manage-group/group-list',
        element: <Grouplist />,
        layout: true
    },
    {
        path: '/manage-group/group-students',
        element: <Groupstudents />,
        layout: true
    },
    {
        path: '/manage-group/group-class',
        element: <Groupclass />,
        layout: true
    },
    {
        path: '/group-detail/:id',
        element: <Groupdetail />,
        layout: true
    },
    {
        path: '/user/login',
        element: <Login />,
        islogin: true
    },
    {
        path: '*',
        element: <NotFound />,
        islogin: true
    }
]


export default routes.map(route => {
    if (route.layout) {
        return {
            ...route,
            element: <PrivateRoute islogin={route.islogin}><Layout>{route.element}</Layout></PrivateRoute>
        }
    }else{
        return {
            ...route,
            element: <PrivateRoute islogin={route.islogin}>{route.element}</PrivateRoute>
        }
    }
})