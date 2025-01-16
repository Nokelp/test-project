import { Button, Image, Space } from 'antd'
import type { ProColumns } from '@ant-design/pro-components'
import type { ProFormColumnsType } from '@ant-design/pro-components'
import { Input } from 'antd'
import type { ClassListItem } from '../../../types'
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/index'



interface ColumnsProps {
    teachers:ClassListItem[]
}


export const getColumns = ({teachers }: ColumnsProps) => {
    console.log(teachers?.map((item) =>{return item.teacher +':'+{text:`${item.teacher}`}}))
    // const valueEnum = {...teachers?.map((item) => {
    //     return item.teacher 
    // })}
    // console.log(valueEnum)
    const columns: ProColumns<ClassListItem>[] = [
        {
            title: '标题',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '班级名称',
            dataIndex: 'name',
            copyable: true,
            ellipsis: true,
            tooltip: '标题过长会自动收缩',

            formItemProps: {
            rules: [
                {
                required: true,
                message: '此项为必填项',
                },
            ],
            },
        },
        {
            // disable: true,
            title: '老师',
            dataIndex: 'teacher',
            valueType: 'select',
            valueEnum : {...teachers?.map((item) => {
                return item.teacher 
            })}
        //     valueEnum={...teachers.map((item) => {item.teacher }
        // },
        },
        {
            disable: true,
            title: '科目类别',
            dataIndex: 'classify',
        },
        {
            title: '创建时间',
            key: '_id',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            valueType: 'dateTimeRange',
            hideInTable: true,
            hideInSearch: true,
            search: {
            transform: (value) => {
                return {
                startTime: value[0],
                endTime: value[1],
                };
            },
            },
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                action?.startEditable?.(record._id);
                }}
            >
                编辑
            </a>,
            <a href='#' target="_blank" rel="noopener noreferrer" key="view">
                查看
            </a>,
            <TableDropdown
                key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                { key: 'copy', name: '复制' },
                { key: 'delete', name: '删除' },
                ]}
            />,
            ],
        },
        ];
    return columns
}
