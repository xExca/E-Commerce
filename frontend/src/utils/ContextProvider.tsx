import { createContext,useContext,useState, useEffect } from "react";


type AuthContextType = {
  user: UserType | null;
  token: string | null;
  setUser: (user:any) => void;
  setToken: (token: string|null) => void;
  checkPermission: (permission: string| undefined) => boolean;
};

type UserType = {
  firstname: string,
  middlename: string,
  lastname: string,
  id: number | null,
  email: string
  permissions: string[]
}

const AuthContext = createContext<AuthContextType>({
  user:null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  checkPermission: () => false,
});


export const ContextProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN') || null);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);
  const setToken = (token: string | null) => {
    _setToken(token)
    if(token){
      localStorage.setItem('ACCESS_TOKEN', token)
    } else{
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }
  const checkPermission = (permission: string | undefined) => {
    if (!user) return false;
    return user.permissions.includes(permission ?? '');
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser, 
      token,
      setToken,
      checkPermission
      }}>
        {children}
    </AuthContext.Provider>
  )
}


export const useStateContext = () => useContext(AuthContext)