import React, { useState } from 'react';
import { StyledButton, StyledUploadDiv } from '../styles/ComponentsStyles';

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
    <StyledUploadDiv>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <StyledButton 
        type="button" 
        variant="contained" 
        onClick={handleUploadClick}
        disabled={!selectedFile} 
      >
        Enviar
      </StyledButton>
    </StyledUploadDiv>
  );
};

export default TransactionUpload;
