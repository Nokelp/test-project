import type { TableColumnsType } from 'antd'
import { ExamClassItem } from '../../../types'
import dayjs from 'dayjs'

export const columns: TableColumnsType<ExamClassItem> = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      width: 200,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '科目分类',
      width: 200,
      dataIndex: 'classify',
    },
    {
      title: '试卷创建人',
      width: 200,
      dataIndex: 'root',
    },
    {
      title: '试卷创建时间',
      width: 300,
      dataIndex: 'createTime',
      render: (_, record) => {
        return dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
  ]