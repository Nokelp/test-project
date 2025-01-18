import React, { useState } from 'react';
import './UpdateInfoModal.scss';
import { Button, Form, Input, Select, InputNumber, Modal, message, Space } from 'antd';
import { UpdateUserInfoApi, getInfoApi } from '../../../../services';
import {
  layout,
  tailLayout,
  type Values,
  type ChildComponentProps,
} from '../constant';
import { useDispatch } from 'react-redux';
import { updateInfo } from '../../../../store/models/userInfo';

const { Option } = Select;

const UpdateInfoModal: React.FC<ChildComponentProps> = props => {
  const { desc, UpdateDesc } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(desc);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onReset = () => {
    form.resetFields();
    if(desc) {
      form.setFieldsValue(desc);
    }
  };

  const getInfo = async () => {
    try {
      const res = await getInfoApi();
      if(res.data.code === 200) {
        UpdateDesc(res.data.data);
        dispatch(updateInfo(res.data.data));
      } else {
        message.error(res.data.msg);
      }
    }catch(err) {
      console.log(err);
    }
  }

  const onFinish = async (values: Values) => {
    try {
      // 编辑个人信息
      const res = await UpdateUserInfoApi(values);
      if(res.data.code === 200) {
        setIsModalOpen(false);
        message.success('编辑成功');
        getInfo();
      } else {
        message.error(res.data.msg);
      }
    }catch(err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        点击编辑
      </Button>
      <Modal
        className="updateInfoModal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          {...layout}
          form={form}
          name="form"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          preserve={false}
        >
          <Form.Item
            name="username"
            label="用户名称"
            placeholder="请输入用户名称"
            rules={[
              {
                  pattern: /^[^\s]*$/,
                  message: '禁止输入空格',
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sex"
            label="性别"
          >
            <Select>
              <Option value={'男'}>男</Option>
              <Option value={'女'}>女</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="age"
            label="年龄"
          >
            <InputNumber min={1}/>
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            rules={[
              {
                  pattern: /^[^\s]*$/,
                  message: '禁止输入空格',
              },
              {
                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                message: '邮箱格式错误',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
              >
                提交
              </Button>
              <Button
                htmlType="button"
                onClick={onReset}
              >
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateInfoModal;