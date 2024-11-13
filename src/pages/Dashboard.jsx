import React, { useState } from 'react';
import UploadButton from '../components/UploadButton';
import * as XLSX from 'xlsx';

function Dashboard() {
    const [file, setFile] = useState(null);
    const [fileContent, setFileContent] = useState([]);

    const handleFileUpload = (uploadedFile) => {
        setFile(uploadedFile);
        parseXLSX(uploadedFile);
    };

    const parseXLSX = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setFileContent(parsedData); // Sets the parsed data in state
        };
        reader.onerror = (error) => console.error("Error reading XLSX file:", error);
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <UploadButton onFileUpload={handleFileUpload} />
            {file && (
                <div className="file-info">
                    <p>Uploaded File: {file.name}</p>
                    <p>File Size: {(file.size / 1024).toFixed(2)} KB</p>
                </div>
            )}
            {fileContent.length > 0 && (
                <div className="file-content">
                    <h3>File Content:</h3>
                    <table>
                        <tbody>
                            {fileContent.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
