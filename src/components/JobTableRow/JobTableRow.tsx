import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {Data} from '../../models/Job'
import { Column } from '../../models/JobTableColumns';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface JobTableRowProps{
    tableColumns:Column[];
    row:any;
    onDataChange: (data:any) => void;
    handleModal:(data:any)=> void;
}

export default function JobTableRow({tableColumns,row,onDataChange,handleModal}:JobTableRowProps) {

  const onIconClick = (data:any) => {
    onDataChange(data)
  }

  const onEmailClick = (data:any) => {
    handleModal(row);
  }
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.jobId}>
    {tableColumns.map((column,index:number) => {
      const value = row[column.id];
      return (
        column.id == 'hrEmail' ?
        <TableCell key={column.id} align={column.align}>
          {row.masked ? 
          <>
            ***********
            <VisibilityIcon onClick = {()=>onIconClick(row)} style={{cursor:'pointer'}}/>
          </> : 
            column.format && typeof value === 'number'
            ? <a style={{textDecoration:'underline',cursor:'pointer'}} onClick={(row)=>onEmailClick(row)}>{column.format(value)}</a>
            : <a style={{textDecoration:'underline',cursor:'pointer'}} onClick={(row)=>onEmailClick(row)}>{value}</a>
          }
        </TableCell> :
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
