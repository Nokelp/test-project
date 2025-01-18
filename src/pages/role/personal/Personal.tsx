import React, { useState, useEffect } from 'react';
import { Descriptions, Form, Space } from 'antd';
import UploadAvatar from './uploadAvatar/UploadAvatar';
import UpdateInfoModal from './updateInfoModal/UpdateInfoModal';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type { InfoData }  from '../../../types';

const Personal: React.FC = () => {
  const info = useSelector((state: RootState) => state.userInfo.info);
  const [ updateDesc, setUpdateDesc ] = useState<InfoData>({});
  const { username, sex, age, email } = updateDesc || {};

  useEffect(() => {
    setUpdateDesc(info);
  }, [info]);

  return (
    <div style={{ padding: '8px 0' }}>
      <Form>
        <Space direction="vertical">
        <Form.Item>
          <UploadAvatar />
        </Form.Item>
        <Form.Item>
          <Descriptions>
            <Descriptions.Item label="用户名称">{username}</Descriptions.Item>
            <Descriptions.Item label="性别">{sex}</Descriptions.Item>
            <Descriptions.Item label="年龄">{age}</Descriptions.Item>
            <Descriptions.Item label="邮箱地址">{email}</Descriptions.Item>
          </Descriptions>
        </Form.Item>
        <Form.Item>
          <UpdateInfoModal desc={updateDesc} UpdateDesc={setUpdateDesc} />
        </Form.Item>
        </Space>
      </Form>
    </div>
  )
}

export default Personal