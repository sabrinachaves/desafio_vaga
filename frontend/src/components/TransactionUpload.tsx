import React, { useState } from 'react';
import { Button } from '@mui/material';

interface TransactionUploadProps {
  onFileUpload: (file: File) => void;
}

const TransactionUpload: React.FC<TransactionUploadProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onFileUpload(selectedFile); 
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <Button 
        type="button" 
        variant="contained" 
        color="primary" 
        onClick={handleUploadClick}
        disabled={!selectedFile} 
      >
        Upload
      </Button>
    </div>
  );
};

export default TransactionUpload;
