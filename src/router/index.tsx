import Home from "../pages/home/Home"
import Permission from "../pages/permission/Permission"
import Login from "../pages/login/Login"
import NotFound from "../pages/notfound/NotFound"
import Layout from "../Layout/Layout"
import Role from "../pages/role/Role"
import User from "../pages/user/User"
import { Navigate } from "react-router-dom"

const routes =  [
    {
        path: '/',
        element: <Home />,
        isLayout: true
    },
    {
        path: '/userManage',
        element: <Navigate to="/userManage/manage-page" />
    },
    {
        path: '/userManage/menuManage',
        element: <Permission />,
        isLayout: true
    },
    {
        path: '/userManage/system',
        element: <Role />,
        isLayout: true
    },
    {
        path: '/userManage/manage-page',
        element: <User />,
        isLayout: true
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

export default routes.map((route) => {
    if (route.isLayout) {
        return {
            ...route,
            element: <Layout>{route.element}</Layout>
        }
    }
    return route
})