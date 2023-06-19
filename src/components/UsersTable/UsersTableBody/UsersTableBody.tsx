import { FC } from 'react';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { User } from '../../../types/User';

interface Props {
  users: User[]
}

export const UsersTableBody: FC<Props> = ({ users }) => {
  return (
    <TableBody>
      {users.map((user) => (
        <TableRow
          key={user.slug}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{user.name}</TableCell>
          <TableCell align="right">{user.sex}</TableCell>
          <TableCell align="right">{user.slug}</TableCell>
          <TableCell align="right">{user.fatherName}</TableCell>
          <TableCell align="right">{user.motherName}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
