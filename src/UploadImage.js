import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileName, setFileName] = useState('');


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

    console.log(fileName)
    const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('image_name', fileName); 
      console.log(typeof(fileName))

      await axios.post('http://127.0.0.1:8000/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success if needed
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error
    }
  };

  const handleGetImage = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/get-image/tenjin-bg.png', {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error getting image:', error);
      // Handle error
    }
  };

  return (
    <div>
      <input type="file" accept=".png" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleGetImage}>Get Image</button>

      {imageUrl && (
        <div>
          <h2>Retrieved Image</h2>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
