import React from 'react'
import JobSearchInput from '../JobSearchInput/JobSearchInput'
import JobTable from '../JobTable/JobTable'
import  Box  from '@mui/material/Box';

export default function Home() {
  return (
    <Box sx={{ p:1}}>
        <JobSearchInput/>
         <JobTable/>
    </Box>
  )
}
