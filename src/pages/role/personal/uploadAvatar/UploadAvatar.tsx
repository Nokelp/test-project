import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { baseURL } from '../../../../services/request';
import { UpdateUserInfoApi, getInfoApi } from '../../../../services';
import { updateInfo } from '../../../../store/models/userInfo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

// 组件
const UploadAvatar: React.FC = () => {
    const info = useSelector((state: RootState) => state.userInfo.info);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>(info?.avator || '');
    const dispatch = useDispatch();

    // 获取个人信息
    const getInfo = async () => {
        try {
            const res = await getInfoApi();
            if(res.data.code === 200) {
                dispatch(updateInfo(res.data.data));
            } else {
                message.error(res.data.msg);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 更新个人信息
    const updateAvatar = async (avatorUrl: string) => {
        try {
            const { username, sex, age, email } = info;
            const res = await UpdateUserInfoApi({
                username,
                sex,
                age,
                email,
                avator: avatorUrl
            });
            if(res.data.code === 200) {
                getInfo();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('您只能上传JPG/PNG文件！');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片必须小于2MB！');
        }
        return isJpgOrPng && isLt2M;
    };

    // 处理服务端响应
    const handleChange: UploadProps['onChange'] = (info) => {
        const { status, response, originFileObj } = info.file;
        if (status === 'uploading') {
            setLoading(true);
            return;
        }
        if (status === 'done') {
            const { msg, data } = response;
            message.success(msg);
            setImageUrl(data.url);
            getBase64(originFileObj as FileType, (url) => {
                setLoading(false);
            });
            // 请求更新接口
            updateAvatar(data.url);
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <Flex gap="middle" wrap>
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={`${baseURL}/profile`}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        </Flex>
    );
};

export default UploadAvatar;