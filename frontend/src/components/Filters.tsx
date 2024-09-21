import React from 'react';
import { TextField, Button } from '@mui/material';

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
    <form onSubmit={handleSubmit}>
      <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Data de início" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <TextField label="Data final" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <TextField label="Id da transação" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
      <TextField label="CPF / CNPJ" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} />
      <Button type="submit" variant="contained" color="primary">Filtrar</Button>
    </form>
  );
};

export default Filters;
