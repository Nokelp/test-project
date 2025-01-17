import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag,message } from 'antd';
import { useRef,useState } from 'react';
import {getstudentListApi,editeStudentListApi,delStudentListApi} from '../../../services/index'
import type {StudentListItem} from '../../../types'

interface saveclass{
  id:string;
  age: number
  avator: string
  birthday: number
  class: string
  createTime: number
  creator: string
  email: string
  gender: number
  grade: string
  name: string
  phone: string
  status: number
  __v: number
  _id: string
}

const columns: ProColumns<StudentListItem>[] = [
  { 
    title: '排序',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '姓名',
    dataIndex: 'username',
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
    title: '性别',
    dataIndex: 'sex',
    valueType: 'select',
    valueEnum: {
      男: { text: '男' },
      女: { text: '女' },
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  { 
    title: '班级',
    dataIndex: 'className',

  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
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

const studentList:React.FC=() => {
  const actionRef = useRef<ActionType>();
  const [data, setData] = useState<any>()


  const getSave=async ( data:saveclass )=>{
    try{
      const res = await editeStudentListApi(data)
      if(res.data.code===200){
        message.success('保存成功')
      }else{
        message.error('修改失败')
      }
    }catch(e){
      console.log(e)
    }
  }

  const delListItem = async (id:string)=>{
    try{
      const res = await delStudentListApi({id})
      if(res.data.code===200){
        message.success('删除成功')
        actionRef.current?.reload()
      }else{
        message.error('删除失败')
      }
    }catch(e){
      console.log(e)
    }
  }



  return (
    <ProTable<StudentListItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        console.log(sort, filter,params);
        const{current,pageSize,...keywords}=params
        const res = await getstudentListApi({ page: params.current!, pagesize: params.pageSize!,...keywords })
        return {
          data: res.data.data.list,
          success: true,
          total: res.data.data.total
        }
        
      }}
      editable={{
        type: 'multiple',
        onSave:async (rowKey, data, row)=>{
          console.log(rowKey, data,row)
          setData(()=>Date.now())
          getSave({id:data._id,...data})
          actionRef.current?.reload()
        },
        onDelete:async (data,row)=>{
          console.log( data,row)
          setData(()=>Date.now())
          delListItem(row._id)
          actionRef.current?.reload()
        },
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
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
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '2',
              },
              {
                label: '3rd item',
                key: '3',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};

export default studentList