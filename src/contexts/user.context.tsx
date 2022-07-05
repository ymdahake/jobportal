import {createContext, useState} from 'react';

export const UserContext = createContext({
currentUser  :null,
setCurrentUser:(user :any)=>{},

});

export const UserProvider =({children}:any)=>{
    const [currentUser,setCurrentUser] = useState<any>(null);
    const value ={currentUser,setCurrentUser};
    return  <UserContext.Provider value={value}>{children}</UserContext.Provider>
}