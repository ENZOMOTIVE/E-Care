import React, { useState } from 'react';
import axios from 'axios';

// Declare API keys as constants
const pinataApiKey = '4b4fd0895622960541a8';
const pinataSecretApiKey = 'b470f444eae295c6ec12c39809b3b2457bac12c48a2c1030b0ede210f70f5837';

const PinataUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataSecretApiKey,
        },
      });

      setUploadResult(response.data);
    } catch (error) {
      console.error('Error uploading file to Pinata:', error.message);
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload to Pinata</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadResult && (
        <div>
          <p>File uploaded successfully to Pinata. IPFS hash: {uploadResult.IpfsHash}</p>
          {/* You can handle the uploaded file URL here */}
        </div>
      )}
      {uploadError && <p>Error: {uploadError}</p>}
    </div>
  );
};

export default PinataUpload;
