import React, { useEffect, useState } from 'react';
import TransactionUpload from '../components/TransactionUpload';
import TransactionTable from '../components/TransactionTable';
import Filters from '../components/Filters';
import axios from 'axios';
import { StyledDashboardDiv } from '../styles/ComponentsStyles';
import { CircularProgress, Box } from '@mui/material';

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (params = {}) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL_TRANSACTION_API}/v1/transaction`, {
        params: {
          ...params,
          page: page + 1,
          pageSize: rowsPerPage,
        },
      });
      setTransactions(response.data.transactions);
      setTotalTransactions(response.data.total);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, rowsPerPage]);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL_TRANSACTION_API}/v1/transaction`, formData);
      fetchTransactions();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (transactionId?: string, name?: string, cpfCnpj?: string, startDate?: string, endDate?: string) => {
    const params = { transactionId, name, cpfCnpj, startDate, endDate };
    const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== ''));
    fetchTransactions(filteredParams);
  };

  return (
    <div >
      <h1>Dashboard de Transações</h1>
      <StyledDashboardDiv>
        <TransactionUpload onFileUpload={handleFileUpload} />
      </StyledDashboardDiv>
      <StyledDashboardDiv>
        <Filters onFilter={handleFilter} />
      </StyledDashboardDiv>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <TransactionTable
          transactions={transactions}
          page={page}
          rowsPerPage={rowsPerPage}
          totalTransactions={totalTransactions}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      )}
    </div>
  );
};

export default Dashboard;
