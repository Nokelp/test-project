import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import ManualAdd from './components/ManualAdd'
import BatchImport from './components/BatchImport'

const CreateItem: React.FC = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '手动添加',
      children: <ManualAdd />,
    },
    {
      key: '2',
      label: '批量导入',
      children: <BatchImport />,
    }
  ]

  const onChange = (key: string) => {
    // console.log(key);
  }
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

    </>
  )
}

export default CreateItem