import React, { MutableRefObject, useRef } from 'react'
import type { ProFormInstance, ActionType } from '@ant-design/pro-components'
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText, 
} from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'
import { getAddPermissionApi } from '../../../../services'

interface Item {
    name: string
    path: string
    disabled: boolean
    isBtn: boolean
}

interface Props {
    actionRef: any
}

const AddMenu: React.FC<Props> = ({ actionRef }) => {
  const [form] = Form.useForm<Item>()
  const restFormRef = useRef<ProFormInstance>()


  return (
    <div>
        <ModalForm<Item>
        title="添加新菜单"
        trigger={
            <Button
            key="primary"
            type="primary"
        >
            添加新菜单
        </Button>   
        }
        formRef={restFormRef}
        autoFocusFirstInput
        modalProps={{
            destroyOnClose: true,
            // onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
            const res = await getAddPermissionApi(values)
            if(res.data.code === 200){
                message.success('添加成功')
                actionRef.current.reload()
            }else{
                message.error(res.data.msg)
            }
            return true
        }}
        >
        <ProForm.Group>
            <ProFormText
                width="md"
                name="name"
                label="菜单名称"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
                rules={[{required: true, message: '请输入菜单名称'}]}
            />

            <ProFormText
                width="md"
                name="path"
                label="路径"
                placeholder="请输入路径"
                rules={[{required: true, message: '请输入路径'}]}
            />
        </ProForm.Group>
        <ProForm.Group>
            <ProFormSelect
            width="md"
            name="disabled"
            label="状态"
            placeholder="请选择状态"
            options={[
                {
                    label: '禁用',
                    value: false, 
                },
                {
                    label: '启用',
                    value: true, 
                }  
            ]}
            rules={[{required: true, message: '请选择状态'}]}
            />
             <ProFormSelect
                width="md"
                name="isBtn"
                label="权限类型"
                placeholder="请选择类型"
                options={[
                    {
                        label: '页面',
                        value: false, 
                    },
                    {
                        label: '按钮',
                        value: true, 
                    }  
                ]}
                rules={[{required: true, message: '请选择权限类型'}]}
            />
        </ProForm.Group>
        </ModalForm>
        
  </div>
  )
}

export default AddMenu