import { Card, TextField } from '@mui/material'
import React from 'react'

export default function JobSearchInput() {
  return (
    <Card sx={{ mb:1,boxShadow: 1,p:1 }}>
        <TextField sx={{ width: 1  }} id="standard-basic" label="Search for Job" variant="standard" />
    </Card>
  )
}
