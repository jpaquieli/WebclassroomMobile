import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api"; // seu api.ts com Axios

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
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega token armazenado no app
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          const payload = JSON.parse(atob(storedToken.split(".")[1]));
          setUser({ username: payload.username, role: payload.role });
        }
      } catch (error) {
        console.error("Erro ao carregar token:", error);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  // Função de login
  const login = async (username: string, password: string) => {
    try {
      const res = await api.post<{ token: string }>("/user/signin", { username, password });

      const token = res.data.token;
      setToken(token);
      await AsyncStorage.setItem("token", token);

      // Decodifica o token JWT para obter o usuário
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ username: payload.username, role: payload.role });
    } catch (error: any) {
      console.error("Erro de login:", error.message);
      throw new Error(error.message || "Usuário ou senha inválidos");
    }
  };

  // Logout limpa tudo
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