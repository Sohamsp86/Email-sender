import React, { useState } from 'react';
import './UploadButton.css';
import PromptSection from '../pages/PromptSection'


function UploadButton({ onFileUpload }) {
  const [fileName, setFileName] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };
  const handlePromptSubmit = (generatedContent) => {
    setGeneratedEmail(generatedContent); 
  };

  return (
    <div className="main-container">
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

      <div className='prompt-section'>
        <PromptSection onPromptSubmit={handlePromptSubmit} />
      </div>

      <div className="groq-content-section">
        {generatedEmail ? (
          <div>
            <h3>Generated Email Response:</h3>
            <div className="email-preview">
              <pre>{generatedEmail}</pre>
            </div>
            <button className="send-email-button">Send Mail</button>
          </div>
        ) : (
          <p>No email generated yet.</p>
        )}
      </div>
    </div>
    
  );
}

export default UploadButton;
