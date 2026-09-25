import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);
const STORAGE_KEY = "halon4_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/me", { token })
      .then(setUser)
      .catch(() => {
        setToken(null);
        localStorage.removeItem(STORAGE_KEY);
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function login(email, password) {
    const data = await api.post("/auth/login", { email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem(STORAGE_KEY, data.token);
    return data.user;
  }

  async function register(payload) {
    const data = await api.post("/auth/register", payload);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem(STORAGE_KEY, data.token);
    return data.user;
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const value = { token, user, loading, login, register, logout, isLoggedIn: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
