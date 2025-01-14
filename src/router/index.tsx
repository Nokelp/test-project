import Home from "../pages/home/Home"
import Detail from "../pages/detail/Detail"
import Login from "../pages/login/Login"
import NotFound from "../pages/notfound/NotFound"

export default  [
    {
        path: '/',
        element: <Home />
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
