import React, { useEffect, useState } from 'react'
import {
  FooterToolbar,
  ProForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { getSubjectApi } from '../../../../services'
import { SubjectItem } from '../../../../types'

const ManualAdd: React.FC = () => {
  const [subject, setSubject] = useState<SubjectItem[]>([])
  const [type, setType] = useState('') 

  const getSubject = async () => {
    const res = await getSubjectApi()
    setSubject(res.data.data.list)
  }

  useEffect(() => {
    getSubject()
  }, [])
  console.log(type)

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
            onChange={(value: any) => setType(value)}
            // fieldProps={{
            //   optionItemRender(item) {
            //     console.log(item)
            //     return <></>
            //   },
            // }}
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
          <ProFormTextArea 
            width="xl"
            label="题目"
            name="question"
            rules={[{ required: true }]}
          />
        </ProForm.Group>
        { Number(type) === 1 &&
          <ProForm.Group>
            <ProFormRadio.Group
              label="选项"
              name="answer"
              options={['A', 'B', 'C', 'D']}
              rules={[{ required: true }]}
            />
          </ProForm.Group>
        }
        { (Number(type) === 2) &&
          <>
          <ProForm.Group>
            <ProFormCheckbox.Group
              label="选项"
              name="answer"
              options={['A', 'B', 'C', 'D']}
              rules={[{ required: true }]}
            />
          </ProForm.Group>
          </>
        }
        { (Number(type) === 3) &&
          <>
          <ProForm.Group>
            <ProFormRadio.Group
              label="选项"
              name="answer"
              options={['对', '错']}
              rules={[{ required: true }]}
            />
          </ProForm.Group>
          </>
        }
        { (Number(type) === 4) &&
          <>
          <ProForm.Group>
            <ProFormTextArea 
              label="正确答案"
              width="xl"
              name="answer"
              rules={[{ required: true }]}
            />
          </ProForm.Group>
          </>
        }
        <ProFormTextArea width="xl" label="解析" name="remark" />
      </ProForm>
    </div>
  )
}

export default ManualAdd