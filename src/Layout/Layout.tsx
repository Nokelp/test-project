import {
    LogoutOutlined,
    PlusCircleFilled,
    SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
    PageContainer,
    ProCard,
    ProConfigProvider,
    ProLayout,
} from '@ant-design/pro-components';
import { css } from '@emotion/css';
import {
    ConfigProvider,
    Dropdown,
    Input,
    theme,
} from 'antd';
import React, { useState } from 'react';
import defaultProps from './_defaultProps';

const SearchInput = () => {
    const { token } = theme.useToken();
    return (
    <div
        key="SearchOutlined"
        aria-hidden
        style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
        }}
        onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        }}
    >
        <Input
        style={{
            borderRadius: 4,
            marginInlineEnd: 12,
            backgroundColor: token.colorBgTextHover,
        }}
        prefix={
            <SearchOutlined
            style={{
                color: token.colorTextLightSolid,
            }}
            />
        }
        placeholder="搜索方案"
        variant="borderless"
        />
        <PlusCircleFilled
        style={{
            color: token.colorPrimary,
            fontSize: 24,
        }}
        />
    </div>
    );
};

const Layout:React.FC<{children: React.ReactNode}>=(props) => {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
    });

    const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
    const [num, setNum] = useState(40);
    if (typeof document === 'undefined') {
    return <div />;
    }
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
            {...defaultProps}
            location={{
                pathname,
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
                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                size: 'small',
                title: '七妮妮',
                render: (props, dom) => {
                return (
                    <Dropdown
                    menu={{
                        items: [
                        {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: '退出登录',
                        },
                        ],
                    }}
                    >
                    {dom}
                    </Dropdown>
                );
                },
            }}
            actionsRender={(props) => {
                if (props.isMobile) return [];
                if (typeof window === 'undefined') return [];
                return [
                props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                    <SearchInput />
                ) : undefined,
                ];
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
                    setPathname(item.path || '/welcome');
                }}
                >
                {dom}
                </div>
            )}
            {...settings}
            >
            <PageContainer
                token={{
                paddingInlinePageContainerContent: num,
                }}
            >
                <ProCard
                style={{
                    height: '200vh',
                    minHeight: 800,
                }}
                >
                <div />
                </ProCard>
            </PageContainer>
            </ProLayout>
        </ConfigProvider>
        </ProConfigProvider>
    </div>
    );
};

export default Layout;