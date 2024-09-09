import { createContext, useContext } from "react";

interface AuthContextType {
  userName: string | null;
  token: string | null;
  login: (userName: string, token: string) => void;
}
export const AuthContext = createContext<AuthContextType>({
  userName: null,
  token: null,
  login: () => {},
});

export const useAuth = () => useContext(AuthContext);
