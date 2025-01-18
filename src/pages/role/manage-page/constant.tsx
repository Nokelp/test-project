import { Button, Space, Image, Popconfirm } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import type { ListItem } from '../../../types';

interface columnsProps {
    onClickEdit: (row: ListItem) => void;
    onConfirm: (row: ListItem) => void;
}

export const getColumns = ({ onClickEdit, onConfirm }: columnsProps) => {
    const columns: ProColumns<ListItem>[] = [
        {
            dataIndex: 'index',
            key: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '头像',
            dataIndex: 'avator',
            key: 'avator',
            hideInSearch: true,
            render: (_, record) => {
                return (
                <Image src={record.avator || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'} width={80}/>
                )
            },
        },
        {
            title: '启用状态',
            dataIndex: 'status',
            key: 'status',
            valueType: 'select',
            valueEnum: {
                0: {
                text: '禁用',
                status: 'Error',
                },
                1: {
                text: '启用',
                status: 'Success',
                },
            },
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
            hideInSearch: true,
        },
        {
            title: '最近登录',
            dataIndex: 'lastOnlineTime',
            key: 'lastOnlineTime',
            valueType: 'dateTime',
            sorter: (a, b) => a.lastOnlineTime - b.lastOnlineTime,
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record) => (
                <Space key={record._id}>
                <Button onClick={() => onClickEdit(record)}>
                    编辑
                </Button>
                <Popconfirm
                    title="确定删除吗?"
                    onConfirm={() => onConfirm(record)}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button danger>
                        删除
                    </Button>
                </Popconfirm>
                </Space>
            ),
        },
    ];
    return columns;
}
