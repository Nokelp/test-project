import type { ProColumns } from '@ant-design/pro-components'
import {
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { getRoleListApi } from '../../../services';
import { RoleItem } from '../../../types';



const Role: React.FC = () => {
  const [roles, setRoles] = useState<RoleItem[]>([])

  const getRoles = async () => {
    try {
     const res = await getRoleListApi()
     console.log(res.data.data.list) 
     setRoles(res.data.data.list)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    getRoles() 
  },[])

  const columns: ProColumns<RoleItem>[] = [
    {
      title: '角色',
      dataIndex: 'name',
      width: '15%',
      render: (_, value) => {
        console.log(_, value)
        return (
          <div>{`${value}`}</div>
        )
      },
    },
    {
      title: '角色关键字',
      dataIndex: 'containers',
      width: '15%',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      valueType: 'select',
      valueEnum: {},
    },
    {
      title: '创建时间',
      dataIndex: 'creator',
      valueType: 'select',
      valueEnum: {},
    },
    {
      title: '操作',
      key: 'option',
      width: 250,
      valueType: 'option',
      render: () => [
        <Button key="link" type="primary">分配角色</Button>,
        <Button key="warn" danger>删除</Button>
      ],
    },
  ];

  return (
    <ProTable<RoleItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: roles,
          success: true,
        });
      }}
      toolbar={{
        search: {
          onSearch: (value: string) => {
            alert(value);
          },
        },
        actions: [
          <Button
            key="primary"
            type="primary"
            onClick={() => {
              alert('add');
            }}
          >
            新增角色
          </Button>,
        ],
      }}
      rowKey="key"
      search={false}
    />
  )
}

export default Role