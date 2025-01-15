import React from 'react';
import { Navigate,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import type { RootState } from '../store'

    interface Props {
        islogin: boolean | undefined;
        children: React.ReactNode;
    }
    const PrivateRoute :React.FC<{ children: React.ReactNode }>= ({children }) => {
        const location = useLocation()
        // 获取当前用户的所有权限
        const permission = useSelector((state: RootState) => state.userInfo?.info.permission ?? [])
        // 根据当前访问的地址去权限中查找是否有此权限
        const isPermission = permission.find((item) => item.path === location.pathname)

        if (isPermission) {
            return children
        }
        return <Navigate to="/403" />
        }

export default PrivateRoute
