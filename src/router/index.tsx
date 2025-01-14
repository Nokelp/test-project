import Home from "../pages/home/Home"
import Detail from "../pages/permission/Permission"
import Login from "../pages/login/Login"
import Permission from "../pages/permission/Permission"
import NotFound from "../pages/notfound/NotFound"
import Layout from "../Layout/Layout"

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
        path: '/manage-group/group-detail/:id',
        element: <Groupdetail />,
        layout: true
    },
    
    {
        path: '/systemManage/manage-page',
        element: <Managepage />,
        layout: true
    },
    {
        path: '/systemManage/menuManage',
        element: <MenuManage />,
        layout: true
    },
    {
        path: '/systemManage/system',
        element: <System />,
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
