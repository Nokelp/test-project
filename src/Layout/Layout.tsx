import {
    LogoutOutlined,
    UserOutlined,
    PlusCircleOutlined
} from '@ant-design/icons'
import {
    PageContainer,
    ProCard,
    ProConfigProvider,
    ProLayout,
} from '@ant-design/pro-components'
import {
    ConfigProvider,
    Dropdown,
    Button,
    message
} from 'antd';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getInfo } from '../store/models/userInfo'
import { AppDispatch, RootState } from '../store'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMenu } from './hooks/useMenu';
import { getLogoutApi } from '../services'

enum Pathname {
    MANAGE_PAGE = '/userManage/manage-page', // 用户管理
    USER_OPTIONS = '/userManage/userOptions', // 用户
    SYSTEM = '/userManage/system', // 角色管理
}

const Layout:React.FC<{children: React.ReactNode}>=(props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()
    const userInfo = useSelector((state: RootState) => state.userInfo.info)
    // 获取要渲染的菜单
    const route = useMenu()
    

    if (typeof document === 'undefined') {
        return <div />;
    }

    // useEffect(() => {
    //     dispatch(getInfo());
    // },[])
    const logout = async () => {
        const res = await getLogoutApi()
        console.log(res.data)
        message.success('退出成功')
        localStorage.removeItem('token')
        navigate('/user/login')
    }
    
    const onClick = (e: { key: string; }) => {
        if (e.key === 'logout') {
            logout()
        }
    }
    
    console.log('~~~~~~' ,userInfo)
    return (
    <div
        id="test-pro-layout"
        style={{
            height: '100vh',
            overflow: 'auto',
        }}
    >
        <ProConfigProvider hashed={false}>
        <ConfigProvider
            getTargetContainer={() => {
            return document.getElementById('test-pro-layout') || document.body;
            }}
        >
            <ProLayout
                prefixCls="my-prefix"
                bgLayoutImgList={[
                    {
                        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                        left: 85,
                        bottom: 100,
                        height: '303px',
                    },
                    {
                        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                        bottom: -68,
                        right: -45,
                        height: '303px',
                    },
                    {
                        src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                        bottom: 0,
                        left: 0,
                        width: '331px',
                    },
                ]}
                // {...defaultProps}
                route={route}
                location={{
                    pathname: location.pathname,
                }}
                token={{
                    header: {
                    colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                    },
                }}
                siderMenuType="group"
                menu={{
                    collapsedShowGroupTitle: true,
                }}
                avatarProps={{
                    src: userInfo?.avator || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                    size: 'small',
                    title: userInfo?.username,
                render: (props, dom) => {
                return (
                    <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'user',
                                icon: <UserOutlined />,
                                label: '个人中心',
                            },
                            {
                                key: 'logout',
                                icon: <LogoutOutlined />,
                                label: '退出登录',
                            },
                        ],
                        onClick: onClick,
                    }}
                    >
                    {dom}
                    </Dropdown>
                );
                },
            }}
            headerTitleRender={(logo, title, _) => {
                const defaultDom = (
                <a>
                    {logo}
                    {title}
                </a>
                );
                if (typeof window === 'undefined') return defaultDom;
                if (document.body.clientWidth < 1400) {
                    return defaultDom;
                }
                if (_.isMobile) return defaultDom;
                return (
                    <>
                        {defaultDom}
                        {/* <MenuCard /> */}
                    </>
                );
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => (
                <div
                    onClick={() => {
                        navigate(item?.path || '/404')
                    }}
                >
                    {dom}
                </div>
            )}
            fixSiderbar={true}
            layout='mix'
            splitMenus={true}
            >
            <PageContainer
                token={{
                    paddingInlinePageContainerContent: 30,
                }}
            >
                { location.pathname === Pathname.MANAGE_PAGE && (
                    <Button
                        type='primary'
                        style={{ marginBottom: 15 }}
                        shape="round"
                        icon={<PlusCircleOutlined />}
                        size='large'
                    >
                        添加用户
                    </Button>
                )}
                <ProCard
                    style={{
                        minHeight: 550,
                    }}
                >
                    {props.children}
                </ProCard>
            </PageContainer>
            </ProLayout>
        </ConfigProvider>
        </ProConfigProvider>
    </div>
    )
}

export default Layout


