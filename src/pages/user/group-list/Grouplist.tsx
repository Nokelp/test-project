import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassList } from '../../../store/models/classlist';
import { AppDispatch,RootState } from '../../../store';
import type { ClassListItem} from '../../../types/index';
import dayjs from 'dayjs';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};


const columns: ProColumns<ClassListItem>[] = [
  {
    title: '排序',
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '班级名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    tooltip: '名称过长会自动收缩',
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
    ellipsis: true,
  
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
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
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
        key="_id"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const classList = useSelector((state: RootState) => state.classList);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
      dispatch(getClassList({page:1,pagesize:5}))
  }, []);

  console.log(classList)



  return (
    <ProTable<ClassListItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      dataSource={classList.ClassList.list}
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