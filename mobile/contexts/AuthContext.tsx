import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export type User = {
  username: string;
  role: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isProfessor: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);

          const payload: any = jwtDecode(storedToken);
          setUser({ username: payload.username, role: payload.role });
        }
      } catch (error) {
        console.error("Erro ao carregar token:", error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await api.post<{ token: string }>("/user/signin", {
        username,
        password,
      });

      const token = res.data.token;
      await AsyncStorage.setItem("token", token);
      setToken(token);

      const payload: any = jwtDecode(token);
      setUser({ username: payload.username, role: payload.role });
    } catch (error: any) {
      console.error("Erro de login:", error);
      throw new Error(error.message || "Usuário ou senha inválidos");
    }
  };
  
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isProfessor = user?.role === "professor";

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, loading, isProfessor }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
};