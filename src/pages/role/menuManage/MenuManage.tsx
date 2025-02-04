import React, { useRef, MutableRefObject } from 'react'
import { getPermissionListApi, getRemovePermissionApi } from '../../../services'
import type { MenuItem } from '../../../types'
import dayjs from 'dayjs'
import type { ProColumns, ProFormInstance, ActionType } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Space, Tag, Popconfirm } from 'antd'
import AddMenu from './components/AddMenu'
  
const MenuManage: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const actionRef = useRef<ActionType>()

  const getRemove = async (id: string) => {
    const res = await getRemovePermissionApi({id})
    if(res.data.code === 200) {
      message.success('删除成功')
      actionRef.current?.reload() 
    }
  }

  const confirm= (id: string) => {
    getRemove(id)
  }
  
  const cancel = () => {
    return
  }

  const columns: ProColumns<MenuItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '权限类型',
      dataIndex: 'isBtn',
      key: 'isBtn',
      render: (_, react) => react.isBtn ? <Tag color="green">按钮</Tag> : <Tag color="red">页面</Tag> 
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (_,react) => dayjs(react.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        
        <Space>
          <Button type="primary" key="edit">编辑</Button>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
            key="delete"
          >
            <Button type="primary" danger >删除</Button>
          </Popconfirm>
        </Space>
      ],
    },
  ]


  return (
    <ProTable<MenuItem>
      columns={columns}
      formRef={formRef}
      actionRef={actionRef}
      request={async() => {
        const res = await getPermissionListApi()
        return {
          data: res.data.data.list,
          success: true,
        }
      }}
      toolbar={{
        search: {
          onSearch: (value: string) => {
            alert(value);
          },
        },
        actions: [
          <AddMenu actionRef={actionRef} />
        ],
      }}
      rowKey="_id"
      search={false}
    />
  )
}

export default MenuManage