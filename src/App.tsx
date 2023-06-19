import { FC } from 'react';
import './App.scss';
import { Container } from '@mui/material';
import { UsersTable } from './components/UsersTable/UsersTable';

export const App: FC = () => {
  return (
    <Container maxWidth="md">
      <UsersTable />
    </Container>
  );
};
