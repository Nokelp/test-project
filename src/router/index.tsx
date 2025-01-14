import Home from "../pages/home/Home"
import Login from "../pages/permission/Permission"
import Permission from "../pages/permission/Permission"
import NotFound from "../pages/notfound/NotFound"
import Role from "../pages/role/Role"
import Users from "../pages/user/User"
import Layout from "../Layout/Layout"
import { Navigate } from "react-router-dom"

const  routes=[
    {
        path: '/',
        element: <Home />,
        layout: true
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
            element: <Layout>{route.element}</Layout>
        }
    }
    return route
})
