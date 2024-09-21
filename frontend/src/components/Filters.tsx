import React from 'react';
import { StyledButton, StyledForm, StyledTextField } from '../styles/ComponentsStyles';

interface FiltersProps {
  onFilter: (transactionId?: string,
    name?: string,
    cpfCnpj?: string,
    startDate?: string,
    endDate?: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const [name, setName] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [transactionId, setTransactionId] = React.useState('');
  const [cpfCnpj, setCpfCnpj] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFilter(transactionId, name, cpfCnpj, startDate, endDate);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <StyledTextField label="Data de início" type="date" value={startDate} slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
        onChange={(e) => setStartDate(e.target.value)} />
      <StyledTextField label="Data final" type="date" value={endDate} slotProps={{
        inputLabel: {
          shrink: true,
        },
      }} onChange={(e) => setEndDate(e.target.value)} />
      <StyledTextField label="Id da transação" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
      <StyledTextField label="CPF / CNPJ" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} />
      <StyledButton type="submit" variant="contained">Filtrar</StyledButton>
    </StyledForm>
  );
};

export default Filters;
