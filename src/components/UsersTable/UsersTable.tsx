import { FC, useEffect, useState } from 'react';
import {
  Paper,
  Table, TableCell,
  TableContainer, TableRow, TextField,
} from '@mui/material';
import usersFromServer from '../../people.json';
import { User } from '../../types/User';
import { UsersTableHeader } from './UsersTableHeader/UsersTableHeader';
import { UsersTableBody } from './UsersTableBody/UsersTableBody';
import { filterUsers } from '../../helpers';

export const UsersTable: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => setUsers(usersFromServer), 500);
  }, []);

  const filteredUsers = filterUsers({ users, searchQuery });

  return (
    <TableContainer component={Paper} elevation={12}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <UsersTableHeader isLoading={users.length === 0} />

        <TableRow>
          <TableCell colSpan={5}>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              onChange={(event) => setSearchQuery(event.target.value)}
              value={searchQuery}
              variant="standard"
              fullWidth
            />
          </TableCell>
        </TableRow>

        <UsersTableBody users={filteredUsers} />
      </Table>
    </TableContainer>
  );
};
