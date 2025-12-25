import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createAluno as apiCreateAluno,
  createProfessor as apiCreateProfessor,
  deleteUser as apiDeleteUser,
  editUser as apiEditUser,
  findAllAluno as apiFindAllAluno,
  findAllProfessor as apiFindAllProfessor,
  type User,
} from "../services/userService";

import { useAuth } from "./AuthContext";

type UsersContextType = {
  professores: User[];
  alunos: User[];

  fetchProfessores: () => Promise<void>;
  fetchAlunos: () => Promise<void>;

  createProfessor: (user: Omit<User, "id" | "role">) => Promise<void>;
  createAluno: (user: Omit<User, "id" | "role">) => Promise<void>;

  updateUser: (id: number, data: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const useUsers = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers deve ser usado dentro de UsersProvider");
  return ctx;
};

export function UsersProvider({ children }: { children: ReactNode }) {
  const { user, isProfessor } = useAuth();

  const [professores, setProfessores] = useState<User[]>([]);
  const [alunos, setAlunos] = useState<User[]>([]);

  const fetchProfessores = useCallback(async () => {
    try {
      const data = await apiFindAllProfessor();
      setProfessores(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar professores:", err);
      setProfessores([]);
    }
  }, []);

  const fetchAlunos = useCallback(async () => {
    try {
      const data = await apiFindAllAluno();
      setAlunos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
      setAlunos([]);
    }
  }, []);

  const createProfessor = useCallback(
    async (payload: Omit<User, "id" | "role">) => {
      const newUser = await apiCreateProfessor(payload);
      setProfessores((prev) => [...prev, newUser]);
    },
    []
  );

  const createAluno = useCallback(
    async (payload: Omit<User, "id" | "role">) => {
      const newUser = await apiCreateAluno(payload);
      setAlunos((prev) => [...prev, newUser]);
    },
    []
  );

  const updateUser = useCallback(async (id: number, data: Partial<User>) => {
    const updated = await apiEditUser(id, data);

    setProfessores((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;

        return {
          ...u,
          ...(updated.username !== undefined && { username: updated.username }),
          ...(updated.password !== undefined && { password: updated.password }),
          ...(updated.role !== undefined && { role: updated.role }),
        };
      })
    );

    setAlunos((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;

        return {
          ...u,
          ...(updated.username !== undefined && { username: updated.username }),
          ...(updated.password !== undefined && { password: updated.password }),
          ...(updated.role !== undefined && { role: updated.role }),
        };
      })
    );
  }, []);

  const deleteUser = useCallback(async (id: number) => {
    await apiDeleteUser(id);
    setProfessores((prev) => prev.filter((u) => u.id !== id));
    setAlunos((prev) => prev.filter((u) => u.id !== id));
  }, []);

  useEffect(() => {
    if (!user) {
      setProfessores([]);
      setAlunos([]);
      return;
    }

    if (isProfessor) {
      fetchProfessores();
      fetchAlunos();
    }
  }, [user, isProfessor, fetchProfessores, fetchAlunos]);

  return (
    <UsersContext.Provider
      value={{
        professores,
        alunos,
        fetchProfessores,
        fetchAlunos,
        createProfessor,
        createAluno,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}