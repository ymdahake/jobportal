import Button from '@mui/material/Button';
import React from 'react'
import { signInWithGooglePopup,createUserDocumentFromAuth } from '../../utils/Firebase.utils'
import { useContext } from 'react';
import { UserContext } from './../../contexts/user.context';
import { GetAllJobData, GetJobsDataFromAWS, GetUserDetail, IsUserExistsInDB } from '../../services/JobService';
import { SetJobsData, GetJobData } from './../../services/JobService';
import { jobsData } from '../../utils/MockData';
import InputModal from './../InputModal/InputModal';
import { SendToMobileTwoTone } from '@mui/icons-material';
import { User } from 'firebase/auth';

export default function SignIn({toggleSignInButton}:any) {
  console.log("sign in component rendered");
  const {setCurrentUser} = useContext(UserContext);
  const [mobileNumer ,setMobileNumer] = React.useState<string>();
  const [hideSignIn ,sethideSignIn] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [googleUser, setGoogleUser]= React.useState<User>();

  const getMobileNumber=(mobileNumber:string)=>{
    setMobileNumer(mobileNumber)
    console.log("getMobileNumber called")
    toggleSignInButton();
    handleClose();
    
  }

    const logGoogleUser= async()=>{
       
      // GetAllJobData().then((result)=>{
      //   console.log('all jobs data yogi',result)
      // });
      SetJobsData(jobsData);

    //  GetJobsDataFromAWS();
    
        const {user} =await signInWithGooglePopup();
       
        setGoogleUser(user)       
        handleOpen(); 
        
          
        // console.log(user);
        // if(mobileNumer!=undefined)
        // {
        //   let userDocRef = await createUserDocumentFromAuth(user,mobileNumer);
        //   setCurrentUser(user);
        // }
        
        
      
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
    {/* <Button variant="contained" color="success" onClick={handleOpen} >Open pop up</Button> */}
    <InputModal open={open} onClose={handleClose} onMobileSubmited={getMobileNumber} user={googleUser}/>    
    </> 
        
  )
}
