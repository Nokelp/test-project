import React, { useState, useRef, useEffect } from 'react'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Space } from 'antd'
import { getExaminationApi } from '../../../services'
import dayjs from 'dayjs'
import { ExamRecordItem, ExamClassItem } from '../../../types'
import TestPreview from './components/TestPreview'
import { getSubjectApi } from '../../../services'


const valueEnum = {
  0: '未开始',
  1: '已结束',
}


const Record: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [open, setOpen] = useState(false)
  const [testItem, setTestItem] = useState<ExamRecordItem | null>(null)
  const [subject, setSubject] = useState<ExamClassItem[]>([])


  const getSubject = async () => {
    const res = await getSubjectApi()
    console.log(res.data.data.list)
    setSubject(res.data.data.list)
  }

  useEffect(() => {
    getSubject()
  }, [])

  const showDrawer = (record: ExamRecordItem) => {
    setOpen(true)
    setTestItem(record)
  }

  const onClose = () => {
    setOpen(false)
  }


  const columns: ProColumns<ExamRecordItem>[] = [
    {
      title: '考试名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '科目分类',
      dataIndex: 'classify',
      valueType: 'select',
      width: 130,
      valueEnum: new Map(subject?.map(item => [item.name, item.name])),
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 300,
      render: (_, record) => {
        return dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: valueEnum,
      width: 300,
    },
    {
      disable: true,
      title: '监考人',
      dataIndex: 'examiner',
      search: true,
      width: 170,
      render: (_, record) => {
        return record.examiner.map((item) => {
          return <div key={item}>{item}</div>
        })
      },
    },
    {
      title: '考试班级',
      key: 'showTime',
      width: 100,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 300,
      render: (_, record) => {
        return dayjs(record.startTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 300,
      render: (_, record) => {
        return dayjs(record.endTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '设置',
      valueType: 'option',
      width: 200,
      render: (text,record) => [
        <Space>
          <Button type="primary" onClick={() => showDrawer(record)}>预览试卷</Button>
          <Button type="primary" disabled={true}>删除</Button>
        </Space>,
      ],
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: () => [
        <Button type="primary">成绩分析</Button>
      ],
    },
  ]
 

  return (
    <>
      <ProTable<ExamRecordItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        scroll={{x: 1500}}
        request={async (params) => {
          const { current, pageSize, ...other} = params
          const res = await getExaminationApi({
            page: current!,
            pagesize: pageSize!,
            ...other
          })
          return {
            data: res.data.data.list,
            total: res.data.data.total,
            success: true,
          }
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            // console.log('value: ', value);
          },
        }}
        rowKey="_id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSizeOptions: ['5', '10', '15', '20', '25']
        }}
        dateFormatter="string"
        headerTitle="考试记录"
      />
      <TestPreview onClose={onClose} open={open} testItem={testItem}/>
    </>
  )
}

export default Record