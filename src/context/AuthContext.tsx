import { getCurrentUser } from "@/lib/appwrite/api";
import { IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


type AuthProviderProps = {
  children: React.ReactElement;
};
type IContextType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export const INITIAL_USER = {
  id: "",
  username: "",
  email: "",
  name: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: AuthProviderProps) => {

    const navigate = useNavigate();

  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          username: currentAccount.username,
          email: currentAccount.email,
          name: currentAccount.name,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    const cookieFallBack = localStorage.getItem('cookieFallback');
    if(
        cookieFallBack === "[]" ||
        cookieFallBack === null ||
        cookieFallBack === undefined
        ){
        navigate('/sign-in')
    }
    checkAuthUser()
  },[])

  const value = {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext)