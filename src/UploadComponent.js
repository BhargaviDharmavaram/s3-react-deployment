import React, { useState, useRef } from 'react';
import s3 from './aws-config';

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const params = {
      Bucket: 's3-react-deployment', // Replace with your S3 bucket name
      Key: `uploads/${file.name}`, // Store uploaded files in the "uploads" folder
      Body: file,
      //ACL: 'public-read', // Optional: Set the access control for the uploaded file
    };

    try {
      const data = await s3.upload(params).promise();
      console.log('File uploaded successfully:', data.Location);
      // Handle success: e.g., show success message or update UI
      // Reset the form by clearing the file input
      setFile(null);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error: e.g., show error message or retry upload
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadComponent;
