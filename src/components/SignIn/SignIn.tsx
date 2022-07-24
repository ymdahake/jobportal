import Button from '@mui/material/Button';
import React from 'react'
import { signInWithGooglePopup,createUserDocumentFromAuth } from '../../utils/Firebase.utils'
import { useContext } from 'react';
import { UserContext } from './../../contexts/user.context';
import { GetAllJobData, GetJobsDataFromAWS, GetUserDetail, IsUserExistsInDB } from '../../services/JobService';
import { SetJobsData, GetJobData } from './../../services/JobService';
import { jobsData } from '../../utils/MockData';
import InputModal from './../InputModal/InputModal';

export default function SignIn() {
  console.log("sign in component rendered");
  const {setCurrentUser} = useContext(UserContext);
  const [inputMobileNumberNeeded ,setInputMobileNumberNeeded] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
    const logGoogleUser= async()=>{
       
      // GetAllJobData().then((result)=>{
      //   console.log('all jobs data yogi',result)
      // });
     // SetJobsData(jobsData);

    //  GetJobsDataFromAWS();
    
        const {user} =await signInWithGooglePopup();
        handleOpen(); 
        setCurrentUser(user);
          
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log("set open value ",open);
    }

  const handleClose = () => setOpen(false);
  const handleOpen =()=> 
  {
    console.log("Handle open called")
    setOpen(true);
    console.log("set open value ",open);
    
  }
  return (  
    <>
    <Button variant="contained" color="success" onClick={logGoogleUser} >SignIn with Google</Button>
    <Button variant="contained" color="success" onClick={handleOpen} >Open pop up</Button>
    <InputModal open={open} onClose={handleClose}/>    
    </> 
        
  )
}
