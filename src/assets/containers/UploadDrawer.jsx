// UploadDrawer.js
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadDrawer = () => {
    const [uploadStatus, setUploadStatus] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        setUploadStatus('Uploading...');

        acceptedFiles.forEach((file) => {
            fetch('/.netlify/functions/generate-presigned-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fileName: file.name })
            })
            .then(response => response.json())
            .then(data => {
                const uploadUrl = data.url;

                return fetch(uploadUrl, {
                    method: 'PUT',
                    body: file,
                    headers: {
                        'Content-Type': file.type,
                    },
                });
            })
            .then(() => {
                console.log('File uploaded successfully:', file.name);
                setUploadStatus('Upload successful!');
                return fetch('/.netlify/functions/upload-notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fileName: file.name })
                });
            })
            .then(response => response.json())
            .then(data => {
                console.log('Notification sent:', data.message);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                setUploadStatus('Upload failed: ' + error.message);
            });
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="dropzone hover-area top-hover">
            <input {...getInputProps()} />
            <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default UploadDrawer;
