import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("userName")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (userName: string, token: string) => {
    setUserName(userName);
    setToken(token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("token", token);
  };
  return (
    <AuthContext.Provider value={{ userName, token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
