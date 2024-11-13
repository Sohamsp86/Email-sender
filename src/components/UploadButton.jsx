import React, { useState } from 'react';
import './UploadButton.css';

function UploadButton({ onFileUpload }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <label htmlFor="file-upload" className="upload-text">
          <div className="file-icon-wrapper">
            <span className="file-icon">📄</span>
          </div>
          <span>Upload a file</span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <p className="file-name">{fileName || 'No file selected'}</p>
      </div>
    </div>
  );
}

export default UploadButton;
