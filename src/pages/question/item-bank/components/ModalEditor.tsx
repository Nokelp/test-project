import { ModalForm, ProFormText, ProFormDateTimeRangePicker, ProFormSelect } from '@ant-design/pro-components'
import { Button, Space, message, Popconfirm, Drawer } from 'antd'
import type { PopconfirmProps } from 'antd'
import { QuestionsListItem } from '../../../../types'
import { useEffect, useRef, useState } from 'react'
import { getUpdateQuestionApi, removeQuestionApi } from '../../../../services'
import type { ProFormInstance } from '@ant-design/pro-components'

interface Props{
  record: QuestionsListItem
  actionRef: any
}

const ModalEditor: React.FC<Props> = ({ record, actionRef }) => {
  const [curItem, setCurItem] = useState<QuestionsListItem>(record)
  const [open, setOpen] = useState(false)
  const formRef = useRef<ProFormInstance>()


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  }

  const curData = (record: QuestionsListItem) => {
    if(record && formRef.current){
      formRef.current.setFieldsValue({
        question: record.question,
        classify: record.classify,
        type: record.type,
      })
    }
    setCurItem(record)
  }

  useEffect(() => {
    curData(record)
  }, [record, formRef]) 

  const getRemove = async (id: string) => {
    try{
      const res = await removeQuestionApi({id})
      if(res.data.code === 200){
        message.success('删除成功') 
      }
    }catch(e){
      console.log(e)
    }
  } 

  const confirm = (id: string) => {
    getRemove(id)
    actionRef.current?.reload()
  }
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    message.error('删除失败')
  }
  
  return (
    <Space>
      <div></div>
      <ModalForm
        title="编辑表单"
        width={500}
        formRef={formRef}
        trigger={<Button type="primary" onClick={() => curData(record)} >编辑</Button>}
        submitter={{
          searchConfig: {
            submitText: '确认',
            resetText: '取消',
          },
        }}
        onFinish={async (values) => {
          console.log(values)
          const res = await getUpdateQuestionApi({
            id: curItem._id,
            question: values.question,
          })
          if(res.data.code === 200){
            message.success('编辑成功')
            actionRef.current?.reload()
          }
          return true
        }}
      >
        <ProFormText
          width="md"
          name="question"
          label="试题列表"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
          rules={[{ required: true }]}
        />

        <ProFormText
          width="md"
          name="classify"
          label="分类"
          placeholder="请输入名称"
          rules={[{ required: true }]}
        />
        
        <ProFormSelect
          width="md"
          name="type"
          label="题型"
          placeholder="请选择"
          options={[
            {
              value: '1',
              label: '单选题',
            },
            {
              value: '2',
              label: '多选题',
            },
            {
              value: '3',
              label: '判断题',
            },
            {
              value: '4',
              label: '填空题',
            }, 
          ]}
          rules={[{ required: true }]}
        />

        <ProFormDateTimeRangePicker name="contractTime" label="创建时间" rules={[{ required: true }]}/>

      </ModalForm>
      <Popconfirm
        title="确定删除吗？"
        onConfirm={() => confirm(record._id)}
        onCancel={cancel}
        okText="确定"
        cancelText="取消"
      >
        <Button danger type="primary">删除</Button>
      </Popconfirm>
      <Button type="default" onClick={showDrawer}>试题详情</Button>
      <Drawer title="试题详情" onClose={onClose} open={open}>
      </Drawer>
    </Space>
  )
}

export default ModalEditor