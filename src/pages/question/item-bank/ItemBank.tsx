import React, { useEffect, useState } from 'react'
import {  PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable} from '@ant-design/pro-components'
import { Button, Modal, Space } from 'antd'
import { useRef } from 'react'
import { getQuestionListApi } from '../../../services'
import { QuestionsListItem } from '../../../types'
import dayjs from 'dayjs'
import { getSubjectApi } from '../../../services'
import type { ExamClassItem } from '../../../types'
import { useNavigate } from 'react-router-dom'
import ModalEditor from './components/ModalEditor'

const valueEnum = {
  1: '单选题',
  2: '多选题',
  3: '判断题', 
  4: '填空题'
}

const ItemBank: React.FC = () => {
  const navigate = useNavigate()
  const actionRef = useRef<ActionType>()
  const [subject, setSubject] = useState<ExamClassItem[]>([])
  
  const getSubject = async () => {
    const res = await getSubjectApi()
    setSubject(res.data.data.list)

  }

  useEffect(() => {
    getSubject()
  }, [])

  const columns: ProColumns<QuestionsListItem>[] = [
    {
      title: '试题列表',
      dataIndex: 'question',
      ellipsis: true,
    },
    {
      title: '分类',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: valueEnum,
    },
    {
      title: '题型',
      dataIndex: 'classify',
      valueType:'select',
      valueEnum: new Map(subject?.map(item => [item.name, item.name])),
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      render: () => {
        return dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') 
      }
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => {
        return(
          <ModalEditor record={record} actionRef={actionRef} />
        )
      }
    },
  ]

  return (
    <>
      <ProTable<QuestionsListItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        scroll={{x: 1000}}
        request={async (params) => {
          const { current, pageSize,...other} = params
          const res = await getQuestionListApi({
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
        headerTitle="试题库"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              navigate('/question/create-item')
            }}
            type="primary"
          >
            添加试题
          </Button>,
        ]}
      />
    </>
  )
}

export default ItemBank