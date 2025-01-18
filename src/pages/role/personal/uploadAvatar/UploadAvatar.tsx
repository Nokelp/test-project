import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { UploaderAvatarApi } from '../../../../services';
import { baseURL } from '../../../../services/request';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    console.log("getBase64", img)
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const UploadAvatar: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [ avatarName, setAvatarName ] = useState<string>('');

    // 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
    const beforeUpload = (file: FileType) => {
        console.log("beforeUpload:", file);
        setAvatarName(file.name);
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

    const handleChange: UploadProps['onChange'] = (info) => {
        console.log("info", info)
        if (info.file.status === 'uploading') {
        setLoading(true);
        return;
        }
        if (info.file.status === 'done') {
        // 从真实世界的响应中获取此url
        getBase64(info.file.originFileObj as FileType, (url) => {
            console.log("url", url)
            setLoading(false);
            setImageUrl(url);
        });
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
            action=''
            // customRequest={() => UploaderAvatarApi({ avatar: avatarName })}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        </Flex>
    );
};

export default UploadAvatar;