import { Button, Image, Space } from 'antd'
import type { ProColumns, ProSchemaValueEnumObj } from '@ant-design/pro-components'
import type { ProFormColumnsType } from '@ant-design/pro-components'
import { Input } from 'antd'
import type { questionItem } from '../../../../types'
import {  TableDropdown } from '@ant-design/pro-components';





// interface ColumnsProps {
//     teachers:ClassListItem[]
// }


export const getColumns = () => {
    const columns: ProColumns<questionItem>[] = [
        {
            title: '题干',
            dataIndex: 'question',
            ellipsis: true,
            width: 100,
        },
        {
            title: '题型',
            dataIndex: 'type',
            width: 100,
            
            
        },
        {
            title: '答案',
            dataIndex: 'answer', 
        },
        ];
    return columns
}