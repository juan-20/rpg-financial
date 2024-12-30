import { createContext, useContext, useState } from "react";
import { passwordENV } from "../service/auth";
import { ToastContainer, toast } from "react-toastify";
import { set } from "firebase/database";

type AuthContextType = {
  pin: string;
  postLocalStorage: (value: string) => void;
  isPinInLocalStorage: (value: string) => void;
  isPinValid: boolean;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  pin: "",
  postLocalStorage: () => {},
  isPinInLocalStorage: () => {},
  isPinValid: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [pin, setPin] = useState<string>(() => {
    return localStorage.getItem("PartyPin") || "";
  });
  const [isPinValid, setIsPinValid] = useState<boolean>(false);

  const postLocalStorage = (value: string) => {
    console.log(value);
    localStorage.setItem("PartyPin", value);
    setPin(value);
  };

  const isPinInLocalStorage = (value: string) => {
    if (value === passwordENV && pin === passwordENV) {
      setIsPinValid(true);
      return;
    } else {
      setIsPinValid(false);
      toast.error("🔒 Faça o Login", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
  };

  const authContextValue: AuthContextType = {
    pin,
    postLocalStorage,
    isPinInLocalStorage,
    isPinValid,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
