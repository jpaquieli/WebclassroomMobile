import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

export type User = {
  username: string;
  role: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) {
        try {
          const payload = JSON.parse(atob(savedToken.split(".")[1]));
          setUser({ username: payload.username, role: payload.role });
          setToken(savedToken);
        } catch {
          await AsyncStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    loadStoredData();
  }, []);

  const login = async (username: string, password: string) => {
    const data = await authService.login(username, password);
    const token = data.token;

    await AsyncStorage.setItem("token", token);
    const payload = JSON.parse(atob(token.split(".")[1]));

    setToken(token);
    setUser({ username: payload.username, role: payload.role });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};