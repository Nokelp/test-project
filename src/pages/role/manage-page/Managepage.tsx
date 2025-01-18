import { useState, useRef } from 'react';
import { message } from 'antd';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { getUserListApi, RemoveUserApi } from '../../../services';
import type { ListItem } from '../../../types';
import UserModal from './userModal/UserModal';
import { useDispatch } from 'react-redux';
import { changeModalOpen, isAdd } from '../../../store/models/userInfo';
import { getColumns } from './constant';

const ManagePage = () => {
  const actionRef = useRef<ActionType>();
  const dispatch = useDispatch();
  const [ editRowInfo, setEditRowInfo ] = useState<ListItem | null>(null);

  return (
    <>
      <ProTable<ListItem>
        columns={getColumns({
          onClickEdit: (row) => {
            dispatch(changeModalOpen(true))
            dispatch(isAdd(false))
            setEditRowInfo(row);
          },
          onConfirm: async (row) => {
            await RemoveUserApi({id: row._id});
            actionRef.current?.reload();
            message.success('删除成功');
          }
        })}
        actionRef={actionRef}
        cardBordered
        rowKey="_id"
        request={async (params) => {
          const { current, pageSize, ...other } = params;
          const res = await getUserListApi({
            page: current,
            pagesize: pageSize,
            ...other
          })
          return {
            data: res.data.data.list,
            total: res.data.data.total,
            success: true
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
        }}
        search={{
          labelWidth: 'auto',
          showHiddenNum: true,
        }}
        options={false}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '30', '50'],
        }}
        dateFormatter="string"
      />
      <UserModal
        reload={() => actionRef.current?.reload()}
        editRowInfo={editRowInfo}
      />
    </>
  );
};

export default ManagePage;