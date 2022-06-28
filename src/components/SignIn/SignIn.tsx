import Button from '@mui/material/Button';
import React from 'react'
import { signInWithGooglePopup,createUserDocumentFromAuth } from '../../utils/Firebase.utils'

export default function SignIn() {
    const logGoogleUser= async()=>{
        const {user} =await signInWithGooglePopup();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
    }
  return (   
        <Button variant="contained" color="success" onClick={logGoogleUser} >SignIn with Google</Button>  
  )
}
