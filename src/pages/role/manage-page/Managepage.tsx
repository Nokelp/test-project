import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Image } from 'antd';
import { useRef } from 'react';
import { getUserListApi } from '../../../services';
import type { ListItem } from '../../../types';
import UserModal from './userModal/UserModal';

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
    render: (text, record, _, action) => (
      <Space key={record._id}>
        <Button type='primary'>
          分配角色
        </Button>
        <Button>
          编辑
        </Button>
        <Button danger>
          删除
        </Button>
      </Space>
    )
    ,
  },
];

const ManagePage = () => {
  const actionRef = useRef<ActionType>();

  return (
    <>
      <ProTable<ListItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowKey="_id"
        request={async (params) => {
          const { current, pageSize, ...other } = params;
          const res = await getUserListApi({
            page: current,
            pagesize: pageSize,
            ...other
          })
          return {
            data: res.data.data.list,
            total: res.data.data.total,
            success: true
          }
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        search={{
          labelWidth: 'auto',
          showHiddenNum: true,
        }}
        options={false}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '30', '50'],
        }}
        dateFormatter="string"
      />
      <UserModal reload={actionRef.current?.reload()}/>
    </>
  );
};

export default ManagePage;