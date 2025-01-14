import React from 'react';
import { Navigate, Outlet,useNavigate } from 'react-router-dom';
    
    interface Props {
        islogin: boolean | undefined;
        children: React.ReactNode;
    }
    const PrivateRoute :React.FC<Props>= ({ islogin,children }) => {
        const navigate = useNavigate();
        const token = localStorage.getItem('token');
    return !islogin || token? (
        children
    ) : (
        <Navigate to="/user/login" replace />
    );
    };
    
export default PrivateRoute;