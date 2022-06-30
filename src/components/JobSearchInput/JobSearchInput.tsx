import { Card, TextField } from '@mui/material'
import React from 'react'

export default function JobSearchInput() {
  return (
    <div>
        <TextField sx={{ width: "90%", }} size='medium'  id="standard-basic" label="Search for Job" variant="standard" />
    </div>
  )
}
