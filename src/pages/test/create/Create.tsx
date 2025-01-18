import type { ProFormInstance } from '@ant-design/pro-components'
import {
  ProCard,
  ProForm,
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components'
import { message, Table } from 'antd'
import { useRef, useState, useEffect } from 'react'
import type { TableProps } from 'antd'
import { getInvigilateApi, getSubjectApi, getStudentGroupApi, getQuestionsListApi } from '../../../services'
import { InvigilateItem, SubjectItem, ExamClassItem } from '../../../types'
import { columns } from './constant'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

type TestItem = {
  class: string;
  dateTime: string[]
  invigilate: string
  name: string
  classify: string
}


const rowSelection: TableProps<ExamClassItem>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: ExamClassItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: ExamClassItem) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

export default () => {
  const navigate = useNavigate()
  const formRef = useRef<ProFormInstance>()
  const [invigilate, setInvigilate] = useState<InvigilateItem[]>([])
  const [subject, setSubject] = useState<SubjectItem[]>([])
  const [classList, setClassList] = useState<ExamClassItem[]>([])
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('radio')
  const [data, setData] = useState<ExamClassItem[]>([])
  const [testItem, setTestItem] = useState<TestItem>()


  const getInvigilate = async () => {
    const res = await getInvigilateApi()
    setInvigilate(res.data.data.list)
  }

  const getSubject = async () => {
    const res = await getSubjectApi()
    setSubject(res.data.data.list)
  }
  
  const getStudentGroup = async () => {
    const res = await getStudentGroupApi()
    setClassList(res.data.data.list)
  }

  useEffect(() => {
    getInvigilate()
    getSubject()
    getStudentGroup()
  }, [])

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async (value) => {
          console.log(value)
          message.success('提交成功')
          navigate('/exam/record')

        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="考试基本信息"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue())
            const data = formRef.current?.getFieldsValue()
            setTestItem(data)
            const res = await getQuestionsListApi({ 
              classify: formRef.current?.getFieldsValue().classify
            })
            const list = res.data.data.list.map((item: any) => {
              return {
                ...item,
                key: item._id
              }
            }) 
            setData(list)
            return true

          }}
        >
          <ProFormText
            name="name"
            label="考试名称"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormDateTimeRangePicker 
            name="dateTime"
            label="考试时间" 
            rules={[{ required: true }]}
          />
          <ProFormSelect
              name="classify"
              label="科目分类"
              rules={[{ required: true }]}
              fieldProps={{
              }}
              // width="lg"
              options={subject.map((item) => ({
                label: item.name,
                value: item.name,
              }))}
          />
          <ProFormSelect
              name="invigilate"
              label="监考人"
              rules={[{ required: true }]}
              fieldProps={{
              }}
              options={invigilate.map((item) => ({
                label: item.username,
                value: item.username,
              }))}
          />
          <ProFormSelect
              name="class"
              label="考试班级"
              rules={[{ required: true }]}
              fieldProps={{
              }}
              // width="lg"
              options={classList.map((item) => ({
                label: item.name,
                value: item.name,
              }))}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          title="配置试卷"
          onFinish={async () => {
            console.log(testItem)
            console.log(formRef.current?.getFieldsValue())
            return true;
          }}
        >
          
          <ProForm.Group>
            <Table<ExamClassItem>
              style={{width: '100%'}}
              rowSelection={{ type: selectionType, ...rowSelection }}
              columns={columns}
              dataSource={data}
            />
            
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="time"
          title="发布考试"
        >
          <div style={{marginBottom: '20px'}}>
            <p style={{lineHeight: '25px'}}>考试名称: {testItem?.name}</p>
            <p style={{lineHeight: '25px'}}>科目分类: {testItem?.classify}</p>
            <p style={{lineHeight: '25px'}}>监考人员: {testItem?.invigilate}</p>
            <p style={{lineHeight: '25px'}}>考试班级: {testItem?.class}</p>
            <p style={{lineHeight: '25px'}}>考试时间: {testItem?.dateTime.map( v => dayjs(v).format('YYYY-MM-DD HH:mm:ss')) + '\r\n'}</p>
          </div>
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};