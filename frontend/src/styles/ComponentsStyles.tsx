import { TextField, Button } from '@mui/material';

import styled from 'styled-components';

export const StyledTextField = styled(TextField)`
  background-color: white;
`;

export const StyledButton = styled(Button)`
  background-color: #1E90FF;
  text-transform: none;
`;

export const StyledUploadDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const StyledDashboardDiv = styled.div`
  margin-bottom: 20px;
`;
