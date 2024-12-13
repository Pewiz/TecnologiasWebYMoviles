import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.sub);
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    //No se si utilizar useMemo, no se muy bien como funciona, pero fue una recomendacion que me dio el linter
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
