import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<ProFormInstance>();

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
          await waitTime(1000);
          message.success('提交成功');
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="考试基本信息"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="考试名称"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            // rules={[{ required: true }]}
          />
          <ProFormDateRangePicker 
            name="dateTime" 
            label="考试时间" 
            // rules={[{ required: true }]}
          />
          <ProFormSelect
              name="stor"
              label="科目分类"
              // rules={[{ required: true }]}
              fieldProps={{
              }}
              // width="lg"
              options={['吴家豪', '周星星', '陈拉风'].map((item) => ({
                label: item,
                value: item,
              }))}
          />
          <ProFormSelect
              name="invigilate"
              label="监考人"
              // rules={[{ required: true }]}
              fieldProps={{
              }}
              // width="lg"
              options={['吴家豪', '周星星', '陈拉风'].map((item) => ({
                label: item,
                value: item,
              }))}
          />
          <ProFormSelect
              name="class"
              label="考试班级"
              // rules={[{ required: true }]}
              fieldProps={{
              }}
              // width="lg"
              options={['吴家豪', '周星星', '陈拉风'].map((item) => ({
                label: item,
                value: item,
              }))}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          title="配置试卷"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >
          
          <ProForm.Group>
            

            
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="time"
          title="发布实验"
          stepProps={{
            description: '这里填入发布判断',
          }}
        >
          <ProFormCheckbox.Group
            name="checkbox"
            label="部署单元"
            rules={[
              {
                required: true,
              },
            ]}
            options={['部署单元1', '部署单元2', '部署单元3']}
          />
          <ProFormSelect
            label="部署分组策略"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue="1"
            options={[
              {
                value: '1',
                label: '策略一',
              },
              { value: '2', label: '策略二' },
            ]}
          />
          <ProFormSelect
            label="Pod 调度策略"
            name="remark2"
            initialValue="2"
            options={[
              {
                value: '1',
                label: '策略一',
              },
              { value: '2', label: '策略二' },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};