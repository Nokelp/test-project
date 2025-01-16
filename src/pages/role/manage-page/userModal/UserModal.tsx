import {
  ModalForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import './UserModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../../store';
import { changeModalOpen } from '../../../../store/models/userInfo';
import { createUserApi } from '../../../../services';
import { useRef, useState } from 'react';

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

type Values = Record<'confirmPassword' | 'username' | 'password' | 'status', string>;

interface Props {
  reload: () => void;
}

const UserModal = (props: Props) => {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.userInfo.userModalOpen);
  const [ errorCode, setErrorCode ] = useState<number | null>(null);

  const createUser = async (value: Values) => {
    const { username, password, status } = value;
    try{
      const res = await createUserApi({
        username,
        password,
        status,
      });
      setErrorCode(res.data.code)
      if (res.data.code === 200) {
        message.success(res.data.msg);
        // 调表格接口刷新数据
        props.reload();
      } else if (res.data.code === 1001) {
        message.error(res.data.msg);
      } else {
        message.error(res.data.msg);
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <>
      <ModalForm
        {...formLayout}
        title="添加用户"
        open={open}
        modalProps={{
          destroyOnClose: true,  // 重制表单
          onCancel: () => dispatch(changeModalOpen(false)),
        }}
        width={520}
        className='user-modal'
        onFinish={async (values: Values) => {
          createUser(values);
          message.success('提交成功');
          dispatch(changeModalOpen(false))
          return true;
        }}
      >
        <ProFormText
            width="md"
            name="username"
            label="账号"
            placeholder="请输入账号"
            rules={[{
                required: true,
                message: '请输入账号',
            }]}
        />
        <ProFormText.Password
          name="password"
          width="md"
          label="密码"
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        />
        <ProFormText.Password
          width="md"
          name="confirmPassword"
          label="确认密码"
          placeholder="请确认密码"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '请确认密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('您输入的两个密码不匹配!'));
              },
            }),
          ]}
        />
        <ProFormRadio.Group
            label="状态"
            name="status"
            options={[
              {
                label: '禁用',
                value: '0',
              },
              {
                label: '启用',
                value: '1',
              }
            ]}
            rules={[{
              required: true,
              message: '请选择状态',
            }]}
        />
      </ModalForm>
    </>
  );
};
export default UserModal;