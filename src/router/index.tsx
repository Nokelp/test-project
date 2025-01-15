import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Permission from "../pages/permission/Permission"
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
import Managepage from "../pages/role/manage-page/Managepage"
import MenuManage from "../pages/role/menuManage/MenuManage"
import System from "../pages/role/system/System"
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
    {
        path: '/manage-group',
        element: <Navigate to="/manage-group/group-list" />
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
        path: '/manage-group/group-detail/:id',
        element: <Groupdetail />,
        layout: true,
        permission: true
    },
    
    {
        path: '/systemManage/manage-page',
        element: <Managepage />,
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


export default routes.map(route => {
    if (route.layout) {
        route.element = <Layout>{route.element}</Layout>
        
}
    // if (route.permission) {
    // route.element = <PrivateRoute>{route.element}</PrivateRoute>
    
    // }
    return route
    
})
