import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag,Drawer } from 'antd';
import { useRef,useState } from 'react';
import request from 'umi-request';
import type { exampaperInfo} from '../../../types'
import {getExamApi} from '../../../services/index'
import {getColumns} from './constant'
import DrawerCompoment from './components/drawer'
import { Navigate ,useNavigate} from 'react-router-dom';


export default () => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  const [rowdata, setRowdata] = useState<exampaperInfo |null>(null);
  const navigate=useNavigate()
  // const openDrawer=()=>{
  //   setOpen(true)
  // }
  // const getrecode=(a:any)=>{
  //   setRowdata(a)
  // }
  const columns = getColumns(
      {
        openDrawer: row => {
          setRowdata(row)
          setOpen(true)
        },
    
      }
  )
  
  return (
    <>
      <ProTable<exampaperInfo>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter,params);
          const {current,pageSize,...keywords}=params
          console.log(keywords)
          const res=await getExamApi({...keywords})
          return {
            data: res.data.data.list,
            success: true,
            total: res.data.data.total,
          }
        }}
        editable={{
          type: 'multiple',
          saveText:'确认修改',
          cancelText:'取消',
          actionRender: (row, config, defaultDom) => [
            defaultDom.save,
            defaultDom.cancel,
          ],

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
              actionRef.current?.reload()
              navigate('/paper/create-paper')
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <DrawerCompoment open={open} setOpen={setOpen} row={rowdata} />
    </>
    )
};