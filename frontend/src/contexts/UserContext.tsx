import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "../types/user";

// Tipagem para o children do context
type UserContextProps = {
  children: ReactNode;
};

// Tipagem do que irá conter no contexto
type UserContextType = {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
};

// Criando o contexto de usuário para autenticação
const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// Criando um contextProvider, que vai envolver toda a aplicação
export const ContextProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("ACCESS_TOKEN")
  );

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Exportando o contexto para usar nos componentes
export const useUser = () => useContext(UserContext);
