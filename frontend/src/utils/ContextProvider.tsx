import React, { createContext, useContext, useEffect, useState } from "react";

type useAuthProps = {
  currentUser: string;
  token: string;
  isLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

type AuthProviderProps = {
  children: React.ReactNode;
}

const AuthContext = createContext<useAuthProps>({
  currentUser: "",
  token: "",
  isLoggedIn: false,
  setUser: () => { },
  setToken: () => { }
})

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      currentUser: user,
      token,
      isLoggedIn,
      setUser,
      setToken,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
}


export { AuthProvider, AuthContext, useAuth }
