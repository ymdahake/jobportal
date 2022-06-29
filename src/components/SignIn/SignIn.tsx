import Button from '@mui/material/Button';
import React from 'react'
import { signInWithGooglePopup,createUserDocumentFromAuth } from '../../utils/Firebase.utils'
import { useContext } from 'react';
import { UserContext } from './../../contexts/user.context';

export default function SignIn() {
  const {setCurrentUser} = useContext(UserContext);
    const logGoogleUser= async()=>{
        const {user} =await signInWithGooglePopup();
        setCurrentUser(user);
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
    }
  return (   
        <Button variant="contained" color="success" onClick={logGoogleUser} >SignIn with Google</Button>  
  )
}
