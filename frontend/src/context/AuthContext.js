import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("glowskin_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (token, userData) => {
    localStorage.setItem("glowskin_token", token);
    localStorage.setItem("glowskin_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("glowskin_token");
    localStorage.removeItem("glowskin_user");
    setUser(null);
  };

  const getToken = () => localStorage.getItem("glowskin_token");

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);