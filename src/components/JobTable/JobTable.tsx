import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import JobTableRow from '../JobTableRow/JobTableRow';

interface Column {
  id: 'jobTitle' | 'city' | 'domain' | 'email' | 'publishedDate'|'entryLevel';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns:  Column[] = [
  { id: 'jobTitle', label: 'JobTitle', minWidth: 170 },
  { id: 'city', label: 'City', minWidth: 100 },
  {
    id: 'domain',
    label: 'Domain',
    minWidth: 170,
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
  },
  {
    id: 'publishedDate',
    label: 'Published Date',
    minWidth: 170,
  },
  {
    id: 'entryLevel',
    label: 'Entry Level',
    minWidth: 170,
  },
];

interface Data {
  jobTitle: string;
  city: string;
  domain: string;
  email: string;
  publishedDate: string;
  entryLevel: string;
}

function createData(
  jobTitle: string,
  city: string,
  domain: string,
  email: string,
  publishedDate: string,
  entryLevel: string,
): Data {
  return { jobTitle, city, domain, email, publishedDate,entryLevel };
}

const rows = [
  createData('Executive Assistant To CEO (8-10 yrs)-1', 'Banglore', 'Audit', 'ymdahake@gmail.com',new Date().toDateString(),'Beginner'),
  createData('Yulu - Financial Planning & Analysis Role (7-14 yrs)', 'Mumbai', 'Audit', 'ymdahake@gmail.com',new Date().toDateString(),'Beginner'),
  createData('nurture.farm - Senior Associate - Business Finance - CA (1-3 yrs)', 'Chennai', 'Audit', 'ymdahake@gmail.com',new Date().toDateString(),'Beginner'),
  createData('External Auditor (1-9 yrs)', 'Banglore', 'Audit', 'ymdahake@gmail.com',new Date().toDateString(),'Beginner'),
  createData('Manager - Finance - FMCG/FMCD/Retail (5-7 yrs)', 'Banglore', 'Audit', 'ymdahake@gmail.com',new Date().toDateString(),'Beginner'),
  createData('Manager - Financial Planning & Analysis (4-9 yrs)', 'Banglore', 'Audit', 'ymdahake@gmail.com',new Date().toDateString(),'Beginner'),
  createData('Financial Planning Analyst - BFS (2-4 yrs)', 'Banglore', 'Audit', 'ymdahake@gmail.com',new Date().toDateString(),'Beginner'),
  createData('Chalo - Manager - Financial Planning & Analysis (3-5 yrs)', 'Banglore', 'Audit', 'ymdahake@gmail.com',new Date().toDateString(),'Beginner'),
  createData('TVS Credit - Business Planning Role (3-10 yrs)', 'Banglore', 'Audit', 'ymdahake@gmail.com',new Date().toDateString(),'Beginner'),
];

export default function JobTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                <JobTableRow tableColumns={columns} row={row}/>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
