import React, { useEffect, useState } from 'react'
import {
  FooterToolbar,
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { getSubjectApi } from '../../../../services'
import { SubjectItem } from '../../../../types'

const ManualAdd: React.FC = () => {
  const [subject, setSubject] = useState<SubjectItem[]>([])

  const getSubject = async () => {
    const res = await getSubjectApi()
    setSubject(res.data.data.list)
  }

  useEffect(() => {
    getSubject()
  }, [])
  // console.log(subjectList.map(item => item.name))

  return (
    <div>
      <ProForm
        submitter={{
          render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
        }}
        onFinish={async (values) =>{
          console.log(values)
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            width="sm"
            name='type'
            label="题型"
            placeholder="请选择题型"
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
          <ProFormSelect
            width="md"
            name='classify'
            label="分类"
            rules={[{ required: true }]}
            options={subject.map((item) => {
              return {
                value: item.name,
                label: item.name, 
              }
            })}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea 
            width="xl"
            label="添加试题"
            name="question"
            rules={[{ required: true }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormRadio.Group
            label="发票类型"
            name="answer"
            initialValue="发票"
            options={['A', 'B', 'C', 'D']}
            rules={[{ required: true }]}
          />
        </ProForm.Group>
        <ProFormTextArea width="xl" label="解析" name="remark" />
      </ProForm>
    </div>
  )
}

export default ManualAdd