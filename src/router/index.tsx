import Home from "../pages/home/Home"
import Detail from "../pages/permission/Permission"
import Login from "../pages/login/Login"
import NotFound from "../pages/notfound/NotFound"
import Layout from "../Layout/Layout"

export default  [
    {
        path: '/',
        element: <Layout><Home /></Layout>
    },
    {
        path: '/detail',
        element: <Detail />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '*',
        element: <NotFound />
    }
]
