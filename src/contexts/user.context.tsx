import {createContext, useEffect, useState} from 'react';
import { onAuthStateChagnedListener } from '../utils/Firebase.utils';

export const UserContext = createContext({
currentUser  :null,
setCurrentUser:(user :any)=>{},

});



export const UserProvider =({children}:any)=>{

    useEffect(()=>{
        const unsubscribe = onAuthStateChagnedListener((user)=>{
            console.log(user);
            setCurrentUser(user);
        })
        return unsubscribe
    },[])

    const [currentUser,setCurrentUser] = useState<any>(null);
    const value ={currentUser,setCurrentUser};
    return  <UserContext.Provider value={value}>{children}</UserContext.Provider>
}