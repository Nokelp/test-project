import './UserModal.scss';
import { message, Form } from 'antd';
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../../store';
import { changeModalOpen } from '../../../../store/models/userInfo';
import { createUserApi, UpdateUserApi } from '../../../../services';
import type { ListItem } from '../../../../types';
import { useEffect } from 'react';

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

type Values = {
  confirmPassword: string;
  username: string;
  password: string;
  status: 0 | 1;
}

interface Props {
  reload: () => void;
  editRowInfo: ListItem | null;
}

const UserModal = (props: Props) => {
  const { reload, editRowInfo } = props;
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.userInfo.userModalOpen);
  const isAddUser = useSelector((state: RootState) => state.userInfo.isAddUser);
  const [form] = Form.useForm();

  const createUser = async (value: Values) => {
    const { username, password, status } = value;
    try {
      const res = await createUserApi({
        username,
        password,
        status,
      });
      if (res.data.code === 200) {
        message.success(res.data.msg);
        dispatch(changeModalOpen(false))
        // 刷新表格
        reload();
      } else if (res.data.code === 1001) {
        dispatch(changeModalOpen(true))
        message.error(res.data.msg);
        return false;
      } else {
        message.error(res.data.msg);
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  const UpdateUser = async (values: Values) => {
    const { confirmPassword, ...other } = values;
    try {
      const res = await UpdateUserApi({...other, id: editRowInfo?._id})
      if(res.data.code === 200) {
        message.success(res.data.msg);
        dispatch(changeModalOpen(false))
        // 刷新表格
        reload();
      } else {
        message.error(res.data.msg);
      }
    }catch(err) {
      console.log("err", err)
    }
  }

  useEffect(() => {
    if(!isAddUser) {
      form.setFieldsValue({
        ...editRowInfo,
        confirmPassword: editRowInfo?.password
      });
    }
  }, [isAddUser, editRowInfo])


  return (
    <>
      <ModalForm
        {...formLayout}
        title={isAddUser ? '添加用户' : '编辑用户'}
        open={open}
        modalProps={{
          destroyOnClose: true,  // 重制表单
          onCancel: () => dispatch(changeModalOpen(false)),
        }}
        form={form}
        width={520}
        className='user-modal'
        onFinish={async (values: Values) => {
          if(isAddUser) {
            // 添加用户
            createUser(values);
          } else {
            // 编辑用户
            UpdateUser(values);
          }
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
                value: 0,
              },
              {
                label: '启用',
                value: 1,
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