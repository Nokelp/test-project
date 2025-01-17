import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, message, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import { useSelector,useDispatch } from 'react-redux';
import {RootState,AppDispatch} from '../../../store/index'
import { getClassList } from '../../../store/models/classList';
import { useEffect,useState } from 'react';
import type { ClassListItem } from '../../../types';
import {getColumns} from './constant';
import CreateItem from './components/createItem'
import {editeClassListApi,delClassListApi,getClassListApi} from '../../../services/index'


export default () => {
  const actionRef = useRef<ActionType>();
  const classList = useSelector((state:RootState)=>state.classList)
  const dispatch:AppDispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const columns = getColumns({
    teachers:classList.ClassList.list
  });
  const searchform=useRef()
  console.log(searchform)
  const [create, setCreate] = useState<boolean>(false);
  interface saveclass{
    id:string,
    classify:string
    creator:string
    _id: string
    name: string
    createTime: number
    teacher: string
    students:[]
    __v: number
  }
  const getSave=async ( data:saveclass )=>{
    try{
      const res = await editeClassListApi(data)
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
      const res = await delClassListApi({id})
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

  // useEffect(() => {
  //   dispatch(getClassList())
  // }, [create,data]);
  return (
    <>
    <CreateItem  modalVisible={modalVisible} setModalVisible={setModalVisible} setCreate={setCreate} creat={create}/>
    <ProTable<ClassListItem>
      columns={columns}
      actionRef={actionRef}
      formRef={searchform}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter,params);
        const{current,pageSize,...keywords}=params
        console.log(keywords)
        const res=await getClassListApi({page:params.current,pagesize:params.pageSize,...keywords})
        return {
          data: res.data.data.list,
          success: true,
          total: res.data.data.total,
        };
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
      headerTitle="班级列表"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            setModalVisible(true)
          }}
          type="primary"
        >
          新建
        </Button>
      ]}
      
    />
    </>
  );
};