import React from 'react'
import JobSearchInput from '../JobSearchInput/JobSearchInput'
import JobTable from '../JobTable/JobTable'
import  Box  from '@mui/material/Box';
import SignUp from '../SignUp/SignUp';
import SeeMore from './../SeeMore/SeeMore';

export default function Home() {
  return (
    <Box sx={{ p:1}}>
        {/* <JobSearchInput/> */}
        <SeeMore/>
         <JobTable/>
         {/* <SignUp/> */}
         
    </Box>
  )
}
