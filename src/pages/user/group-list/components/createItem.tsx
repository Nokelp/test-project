import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useRef, useState,useEffect } from 'react';
import { createClassApi } from '../../../../services/index'

interface Props {
    creat:boolean;
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    setCreate: (visible: boolean) => void
}

const CreateItem:React.FC<Props>=({modalVisible,setModalVisible,setCreate,creat}) => {

const formRef = useRef<ProFormInstance>();

const createClass=async ( data:{name: string,classify:string,teacher:string,students:[]})=>{
    try{
        const res = await createClassApi(data)
        if(res.data.code===200)setCreate(!creat)
        console.log(res.data)
    }catch(e){
        console.log(e)
        message.error('创建失败')
    }
}
useEffect(() => {
if(modalVisible){
    formRef.current?.resetFields()
}
}, [modalVisible])

return (
    <Space>
    <ModalForm
        title="新建表单"
        formRef={formRef}
        open={modalVisible}
        onOpenChange={setModalVisible}
        submitter={{
            render: (props, defaultDoms) => {
                return [
                    ...defaultDoms,
                    <Button
                    key="extra-reset"
                    onClick={() => {
                        props.reset();
                    }}
                    >
                    重置
                    </Button>,
                ];
                },
            }}
        onFinish={async (values) => {
            if(values.name){
                createClass({name:values.name,classify:values.classify,teacher:values.teacher,students:[]})
            }
        console.log(values?'a':'b');
        message.success('提交成功');
        return true;
        }}
    >
        <ProFormText
            width="md"
            name="name"
            label="班级名称:"
            tooltip="最长为 24 位"
            placeholder="请输入班级名称"
        />

        <ProFormText
            width="md"
            name="teacher"
            labelCol={{ span: 4 }}
            label="老师:"
            placeholder="请输入老师名称"
        />
        <ProFormText
            width="md"
            name="classify"
            label="科目类别:"
            placeholder="请输入科目名称"
        />
    </ModalForm>
    </Space>
);
};

export default CreateItem