import { FC } from 'react';
import {
  LinearProgress, TableCell, TableHead, TableRow,
} from '@mui/material';

interface Props {
  isLoading: boolean;
}

export const UsersTableHeader: FC<Props> = ({ isLoading }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="right">Sex</TableCell>
        <TableCell align="right">Slug</TableCell>
        <TableCell align="right">Father</TableCell>
        <TableCell align="right">Mother</TableCell>
      </TableRow>

      {isLoading && (
        <TableRow>
          <TableCell colSpan={5}>
            <LinearProgress />
          </TableCell>
        </TableRow>
      )}
    </TableHead>
  );
};
