import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText, 
} from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'

const AddMenu: React.FC = () => {
  const [form] = Form.useForm<{ name: string; company: string }>()
  return (
    <div>
        <ModalForm<{
        name: string;
        company: string;
        }>
        title="新建表单"
        trigger={
            <Button
            key="primary"
            type="primary"
        >
            添加新菜单
        </Button>   
        }
        form={form}
        autoFocusFirstInput
        modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
            console.log(values.name);
            message.success('提交成功');
            return true;
        }}
        >
        <ProForm.Group>
            <ProFormText
                width="md"
                name="name"
                label="菜单名称"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
            />

            <ProFormText
                width="md"
                name="path"
                label="路径"
                placeholder="请输入名称"
            />
        </ProForm.Group>
        <ProForm.Group>
            <ProFormText
            width="md"
            name="contract"
            label="子项名称"
            placeholder="请输入名称"
            />
             <ProFormText
            width="md"
            name="contract"
            label="子项路径"
            placeholder="请输入名称"
            />
        </ProForm.Group>
        </ModalForm>
        
  </div>
  )
}

export default AddMenu