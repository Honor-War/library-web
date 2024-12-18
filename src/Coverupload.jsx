import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { toast } from 'react-toastify';
import { useUploadBlob } from './hooks/useUploadBlob.ts'
import { addBlob } from "./contracts/gallery.ts"
import { useNetworkVariables } from "./config/index.ts"
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit"


export default function CoverUpload() {
    const { storeBlob } = useUploadBlob();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const networkVariables = useNetworkVariables()

    const props = {
        name: 'file',
        method: 'post',
        customRequest: async (options) => {
            console.log(options);
            
            // 1. 上传到 Walrus
            const blobInfo = await storeBlob(options.file)
            
            console.log(blobInfo)
            const libraryId = '0xb31a35a1c0fb20c597b658f9ddd50bb00b195e8e22b1ed8bb773e0fb57cb2010'
                      
             console.log(blobInfo)
 
             // 2. 调用合约添加 blob
             const tx = await addBlob(
                 networkVariables,
                 libraryId,
                 blobInfo.blobId
             )
             await signAndExecuteTransaction({ transaction: tx }, {
                 onSuccess: () => {
                    options.onSuccess({ data: 'success' });
                 }
             })


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

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">
                Click or drag the file to this area to upload it
            </p>
        </Dragger>
    );
}
