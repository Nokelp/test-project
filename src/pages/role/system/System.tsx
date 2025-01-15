import type { ProColumns, ProFormInstance} from '@ant-design/pro-components'
import {
  ProTable,
  ModalForm,
  ProFormText
} from '@ant-design/pro-components'
import { Button, Drawer, message } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import { getCreateRoleApi, getRoleListApi } from '../../../services'
import { RoleItem } from '../../../types'
import dayjs from 'dayjs'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}


const Role: React.FC = () => {
  const [roles, setRoles] = useState<RoleItem[]>([])
  const [open, setOpen] = useState(false);
  const restFormRef = useRef<ProFormInstance>()
  const formRef = useRef<ProFormInstance>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const showDrawer = () => {
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

  const columns: ProColumns<RoleItem>[] = [
    {
      title: '角色',
      dataIndex: 'name',
      width: '15%',
      render: (_, value) => {
        return (
          <div>{_}</div>
        )
      },
    },
    {
      title: '角色关键字',
      dataIndex: 'value',
      width: '15%',
      render: (_, value) => {
        return (
          <div>{value.value}</div>
        )
      },
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      valueType: 'select',
      render: (_, value) => {
        return (
          <div>{value.creator}</div>
        )
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'select',
      render: (_, value) => {
        return (
          <div>{dayjs(value.createTime).format('YYYY-MM-DD hh:mm:ss')}</div>
        )
      },
    },
    {
      title: '操作',
      key: 'option',
      width: 250,
      valueType: 'option',
      render: () => [
        <Button key="link" type="primary" onClick={showDrawer}>分配角色</Button>,
        <Button key="warn" danger>删除</Button>
      ],
    },
  ]


  return (
    <div>
      <ProTable<RoleItem>
        columns={columns}
        dataSource={roles}
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
                // tooltip="最长为 24 位"
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
      <Drawer title="分配角色" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}

export default Role