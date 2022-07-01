import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {Data} from '../../models/Job'
import { Column } from '../../models/JobTableColumns';

interface JobTableRowProps{
    tableColumns:Column[];
    row:Data;
}

export default function JobTableRow({tableColumns,row}:JobTableRowProps) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.jobId}>
    {tableColumns.map((column) => {
      const value = row[column.id];
      return (
        <TableCell key={column.id} align={column.align}>
          {column.format && typeof value === 'number'
            ? column.format(value)
            : value}
        </TableCell>
      );
    })}
  </TableRow>
  )
}
