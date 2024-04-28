import { createContext, useContext, useState } from "react";

const userContext = createContext();


function UserProvider({children}){
    const [user , setUser] = useState(null);
    return (
        <userContext.Provider value={{
            user,
            setUser,
        }}>
            {children}
        </userContext.Provider>
    )
}

function UserDetails(){
    return useContext(userContext);
}

export {UserDetails,UserProvider};