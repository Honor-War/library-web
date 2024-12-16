import React from 'react';
import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { toast } from 'react-toastify';

const props = {
    name: 'file',
    method: 'post',
    customRequest: (options) => {
        console.log(options);
        setTimeout(() => {
            options.onSuccess({ data: 'success' });
        }, 1000);
    },
    type: 'line',
    onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
            toast.success(`${info.file.name} success`);
        } else if (status === 'error') {
            toast.error(`${info.file.name} failed`);
        }
    }
};

const dragger = <Dragger {...props}>
    <p className="ant-upload-drag-icon">
        <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag the file to this area to upload it</p>
</Dragger>

export default function CoverUpload(props) {

    return props?.value ? (
        <div>
            <img src={'http://localhost:3000/' + props.value} alt="封面" width="100" height="100" />
            {dragger}
        </div>
    ) : (
        <div>
            {dragger}
        </div>
    );
}