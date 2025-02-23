import { createContext,useState,useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(localStorage.getItem('token') || null);
    const [user,setUser] = useState(null);

    //save token to localStorage and state
    const login = (newToken)=>{
        localStorage.setItem('token',newToken);
        setToken(newToken);
    }

    //Clear token and user data
    const logout = ()=>{
        setToken(null);
        setUser(null);
    };

    return(
        <AuthContext.Provider value = {{token,user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext);