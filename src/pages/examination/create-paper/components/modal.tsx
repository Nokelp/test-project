import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText,ProTable } from '@ant-design/pro-components';
import { Button, Space, message,Table  } from 'antd';
import { useRef, useState ,useEffect} from 'react';
import {questionItem} from '../../../../types/index'
import {getColumns} from './constant'
import {getquestionsApi} from '../../../../services/index'

const waitTime = (time: number = 100) => {
return new Promise((resolve) => {
    setTimeout(() => {
    resolve(true);
    }, time);
});
};

interface Props {  
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    title:string |null
    setQustions:(qustions:questionItem[])=>void
    examDatasource:questionItem[]|null
    setExamDatasource:(examDatasource:questionItem[])=>void
}

const modal:React.FC<Props>= ({modalVisible,setModalVisible,title,setQustions,setExamDatasource,examDatasource}) => {
const restFormRef = useRef<ProFormInstance>();
const formRef = useRef<ProFormInstance>();
const columns = getColumns()


const getexamInfo=async ()=>{
    const res = await getquestionsApi({classify:title!});
    setExamDatasource(res.data.data.list)
}
useEffect(() => {
    getexamInfo()
}, [title]);

return (
    <Space>
    <ModalForm
        title="试题列表"
        formRef={restFormRef}
        open={modalVisible}
        onOpenChange={setModalVisible}
        submitter={{
            render: (props, defaultDoms) => {
            return [
                defaultDoms.find(v =>v.key==='submit'),
            ];
            },
        }}
        onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        return true;
        }}
    >
        <ProTable<questionItem>
        columns={columns}
        rowSelection={{
            // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
            // 注释该行则默认不显示下拉选项
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            // defaultSelectedRowKeys: [1],
        }}
        tableAlertRender={({
            selectedRowKeys,
            selectedRows,
            onCleanSelected,
        }) => {
            console.log(selectedRowKeys, selectedRows);
            setQustions(selectedRows)
            return (
            <Space size={24}>
                <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                    取消选择
                </a>
                </span>
                <span>{`试题数量: ${selectedRows.reduce(
                (pre, item) => pre + 1,
                0,
                )} 个`}</span>

            </Space>
            );
        }}
        tableAlertOptionRender={() => {
            return (
            <Space size={16}>
                <a>批量删除</a>
                <a>导出数据</a>
            </Space>
            );
        }}
        dataSource={examDatasource || []}
        options={false}
        search={false}
        pagination={{
            pageSize: 5,
        }}
        rowKey="_id"
        headerTitle="批量操作"
        toolBarRender={() => [<Button key="show">查看日志</Button>]}
    />
    </ModalForm>
    </Space>
);
};

export default modal