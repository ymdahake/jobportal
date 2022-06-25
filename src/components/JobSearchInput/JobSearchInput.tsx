import { Card, TextField } from '@mui/material'
import React from 'react'

export default function JobSearchInput() {
  return (
    <Card sx={{ width: 0.9 , margin: 2 }}>
        <TextField sx={{ width: 0.9 , margin: 2 }} id="standard-basic" label="Search for Job" variant="standard" />
    </Card>
  )
}
