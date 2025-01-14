import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Permission from "../pages/system/permission/Permission"
import NotFound from "../pages/notfound/NotFound"
import Role from "../pages/system/role/Role"
import Users from "../pages/system/user/User"
import Layout from "../Layout/Layout"
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
        element: <Home />,
        layout: true,
        islogin: true
    },
    {
        path: '/question',
        element: <Navigate to="/question/item-bank" />
    },
    {
        path: '/userManage',
        element: <Navigate to="/userManage/manage-page" />
    },
    {
        path: '/userManage/manage-page',
        element: <Users />,
        layout: true
    },
    {
        path: '/userManage/menuManage',
        element: <Permission />,
        layout: true
    },
    {
        path: '/userManage/system',
        element: <Role />,
        layout: true
    },
    {
        path: '/user/login',
        element: <Login />
    },
    {
        path: '*',
        element: <NotFound />
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
