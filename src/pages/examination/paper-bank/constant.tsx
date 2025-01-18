import { Button, Image, Space } from 'antd'
import type { ProColumns, ProSchemaValueEnumObj } from '@ant-design/pro-components'
import type { ProFormColumnsType } from '@ant-design/pro-components'
import { Input } from 'antd'
import type { ClassListItem } from '../../../types'
import {  TableDropdown } from '@ant-design/pro-components';
import type { exampaperInfo} from '../../../types'
import {getExamApi} from '../../../services/index'
import { useState,useEffect } from 'react'







interface ColumnsProps {
    openDrawer: (row: exampaperInfo) => void

}


export const getColumns = ({openDrawer}:ColumnsProps ) => {
    const [datalist, setdatalist] = useState<exampaperInfo[]>()
    const getEnum = async() => {
        const res = await getExamApi({})
        setdatalist(res.data.data.list)
    }
    useEffect(() => {
        getEnum()
    }, []);
    const columns: ProColumns<exampaperInfo>[] = [
        {
            title: '试卷名称',
            dataIndex: 'name',
        },
        {
            disable: true,
            title: '科目类型',
            dataIndex: 'classify',
            valueType: 'select',
            hideInSearch: true,
            editable:false,
        },
        {
            disable: true,
            title: '查询科目',
            dataIndex: 'classify',
            valueType: 'select',
            hideInTable: true,
            valueEnum:new Map(datalist?.map((item)=>[item.classify,item.classify]))
        },
        {
            disable: true,
            title: '总分',
            dataIndex: '_v',
            hideInSearch: true,
            editable:false,
        },
        {
            disable: true,
            title: '创建人',
            dataIndex: 'creator',
            hideInSearch: true,
            editable:false,
        },
        {
            disable: true,
            title: '创建人',
            dataIndex: 'creator',
            valueType: 'select',
            hideInTable: true,
            valueEnum:new Map(datalist?.map((item)=>[item.creator,item.creator]))
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            sorter: true,
            hideInSearch: true,
            editable:false,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
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
            fixed: 'right',
            width: 200,
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
            <a
                key="editable"
                style={{ background: '#1890FF' ,color:'#fff',padding:'2px 5px',fontSize:'12px',margin:'10px 0'}}
                onClick={() => {
                action?.startEditable?.(record._id);    
                }}
            >
                编辑
            </a>,
            <a    
                key="del"
                style={{ background: 'red' ,color:'#fff',padding:'2px 5px',fontSize:'12px'}}
            >
                删除
            </a>,
            <a   
                key="review"
                style={{ color:'#777',padding:'2px 5px',fontSize:'12px',border:'1px solid #777777'}} 
                onClick={() => {
                    openDrawer(record)
                }}   
            >
                预览试卷
            </a>,
            ],
        },
        ];
    return columns
}
