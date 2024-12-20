import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { toast } from 'react-toastify';
import { useUploadBlob } from './hooks/useUploadBlob.ts'
import { addBlob } from "./contracts/gallery.ts"
import { useNetworkVariables } from "./config/index.ts"
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit"
import { useCurrentAccount } from '@mysten/dapp-kit'
import { CONTRACT_CONFIG } from './config/index.ts';


export default function CoverUpload() {
    const { storeBlob } = useUploadBlob();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const networkVariables = useNetworkVariables()
    const account = useCurrentAccount();

    const props = {
        name: 'file',
        method: 'post',
        customRequest: async (options) => {
            console.log(options);

            if (!account) {
                toast.error("Please connect your wallet");
                options.onError({ data: 'error' });
                return;
            }
            try {
                // 1. 上传到 Walrus
                const blobInfo = await storeBlob(options.file)
                console.log(blobInfo)
                const libraryId = CONTRACT_CONFIG.LIBRARY_ID;
                console.log(libraryId,'libraryId========')
                // 2. 调用合约添加 blob
                const tx = await addBlob(
                    networkVariables,
                    libraryId,
                    blobInfo.blobId
                )
                console.log(tx)
                await signAndExecuteTransaction({ transaction: tx }, {
                    onSuccess: () => {
                        options.onSuccess({ data: 'success' });
                    }
                })
            } catch (error) {
                console.log(error,'error==========')
                toast.error("Error uploading file");
                options.onError({ data: 'error' });
            }


        },
        type: 'line',
        onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                toast.success(`${info.file.name} success`);
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
