import type { ProColumns, ProFormInstance} from '@ant-design/pro-components'
import {
  ProTable,
  ModalForm,
  ProFormText
} from '@ant-design/pro-components'
import { Button, Drawer, message, Popconfirm } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import { getCreateRoleApi, getRemoveRoleApi, getRoleListApi } from '../../../services'
import { RoleItem } from '../../../types'
import dayjs from 'dayjs'
import Tree from './components/Tree';



const Role: React.FC = () => {
  const [roles, setRoles] = useState<RoleItem[]>([])
  const [open, setOpen] = useState(false);
  const restFormRef = useRef<ProFormInstance>()
  const [selectedKeys, setSelectedKeys] = useState()
  const formRef = useRef()

  const showDrawer = (value: RoleItem) => {
    setSelectedKeys(value.permission)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getRoles = async () => {
    try {
     const res = await getRoleListApi()
     setRoles(res.data.data.list)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    getRoles() 
  },[])

  const confirm= (id: string) => {
    getRemove(id)
  };
  
  const cancel = () => {
    return
  };

  const getRemove = async (id: string) => {
    try{
      const res = await getRemoveRoleApi({id})
      console.log(res.data)
      if(res.data.code === 200){
        message.success('删除成功')
        getRoles() 
      }
    }catch(e){
      console.log(e)
    }
  }

  const columns: ProColumns<RoleItem>[] = [
    {
      title: '角色',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: '角色关键字',
      dataIndex: 'value',
      width: '15%'
    },
    {
      title: '创建人',
      dataIndex: 'creator'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_, value) => {
        return (
          <div>{dayjs(value.createTime).format('YYYY-MM-DD hh:mm:ss')}</div>
        )
      },
    },
    {
      title: '操作',
      width: 250,
      valueType: 'option',
      render: (_, value) => [
        <>
          <Button key="link" type="primary" onClick={()=>showDrawer(value)}>分配角色</Button>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => confirm(value._id)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button key="warn" danger>删除</Button>
          </Popconfirm>
        </>
      ],
    },
  ]

 


  return (
    <div>
      <ProTable<RoleItem>
        columns={columns}
        dataSource={roles}
        formRef={formRef}
        toolbar={{
          search: {
            onSearch: (value: string) => {
              alert(value);
            },
          },
          actions: [
            <ModalForm
              title="新增角色"
              trigger={<Button type="primary">新增角色</Button>}
              formRef={restFormRef}
              submitter={{
                searchConfig: {
                  submitText: '确认',
                  resetText: '取消',
                },
              }}
              onFinish={async (values) => {
                try{
                  const res = await getCreateRoleApi({
                    name: values.name,
                    value: values.company
                  })
                  if(res.data.code === 200){
                    message.success('提交成功')
                    getRoles()
                    restFormRef.current?.resetFields()
                    return true
                  }
                }catch(e){
                  console.log(e)
                }
                
              }}
            >
              <ProFormText
                width="md"
                name="name"
                label="角色名称"
                placeholder="请输入名称"
              />

              <ProFormText
                width="md"
                name="company"
                label="角色关键字"
                placeholder="请输入关键字"
              />
            </ModalForm>
          ],
        }}
        rowKey="_id"
        search={false}
      />
      <Drawer title="分配权限" onClose={onClose} open={open}>
        <Tree roles={selectedKeys} />
      </Drawer>
    </div>
  )
}

export default Role