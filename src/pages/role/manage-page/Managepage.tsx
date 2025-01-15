import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import { getUserListApi } from '../../../services';
import type { ListItem } from '../../../types';

const columns: ProColumns<ListItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '头像',
    dataIndex: 'avator',
    copyable: true,
    ellipsis: true,
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
    disable: true,
    title: '启用状态',
    dataIndex: 'state',
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      open: {
        text: '全部',
        status: 'All',
      },
      closed: {
        text: '启用',
        status: 'qiyong',
      },
      processing: {
        text: '禁用',
        status: 'jinyong',
      },
    },
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    // render: (_, record) => (
    //   <Space>
    //   </Space>
    // ),
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
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

const ManagePage = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<ListItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params) => {
        const res = await getUserListApi({
          page: params.current,
          pagesize: params.pageSize,
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
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
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
        onChange: (page) => console.log("page", page),
      }}
      dateFormatter="string"
    />
  );
};

export default ManagePage;