import React, { useMemo } from 'react';
import { Button, type ButtonProps } from "antd";
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

type Props = ButtonProps & { permissionKey: string };

const PermissionButton: React.FC<Props> = props => {
    const { children, permissionKey, ...other } = props;
    const permission = useSelector((state: RootState) => state.userInfo.info?.permission || []);

    const isPermission = useMemo(() => {
        return !!permission?.find(item => item.path === permissionKey);
    }, [permissionKey, permission]);

    if(isPermission) {
        return (
            <Button {...other}>{children}</Button>
        )
    }else {
        return null;
    }
}

export default PermissionButton