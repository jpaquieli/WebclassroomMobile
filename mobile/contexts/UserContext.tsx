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
  if (!ctx) {
    throw new Error("useUsers deve ser usado dentro de UsersProvider");
  }
  return ctx;
};

export function UsersProvider({ children }: { children: ReactNode }) {
  const { user, isProfessor } = useAuth();

  const [professores, setProfessores] = useState<User[]>([]);
  const [alunos, setAlunos] = useState<User[]>([]);

  // -----------------------------
  // FETCH PROFESSORES
  // -----------------------------
  const fetchProfessores = useCallback(async () => {
    if (!isProfessor) return;

    try {
      const data = await apiFindAllProfessor();
      setProfessores(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar professores:", err);
      setProfessores([]);
    }
  }, [isProfessor]);

  // -----------------------------
  // FETCH ALUNOS
  // -----------------------------
  const fetchAlunos = useCallback(async () => {
    if (!isProfessor) return;

    try {
      const data = await apiFindAllAluno();
      setAlunos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
      setAlunos([]);
    }
  }, [isProfessor]);

  // -----------------------------
  // CREATE PROFESSOR
  // (garante username no estado local)
  // -----------------------------
  const createProfessor = useCallback(
    async (payload: Omit<User, "id" | "role">) => {
      const newUser = await apiCreateProfessor(payload);

      if (newUser) {
        setProfessores((prev) => [...prev, newUser]);
      }
    },
    []
  );

  // -----------------------------
  // CREATE ALUNO
  // -----------------------------
  const createAluno = useCallback(
    async (payload: Omit<User, "id" | "role">) => {
      const newUser = await apiCreateAluno(payload);

      if (newUser) {
        setAlunos((prev) => [...prev, newUser]);
      }
    },
    []
  );

  // -----------------------------
  // UPDATE USER
  // (não sobrescreve campos com undefined)
  // -----------------------------
  const updateUser = useCallback(async (id: number, data: Partial<User>) => {
    const updated = await apiEditUser(id, data);

    if (!updated) return;

    setProfessores((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              ...(updated.username !== undefined && {
                username: updated.username,
              }),
              ...(updated.password !== undefined && {
                password: updated.password,
              }),
              ...(updated.role !== undefined && { role: updated.role }),
            }
          : u
      )
    );

    setAlunos((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              ...(updated.username !== undefined && {
                username: updated.username,
              }),
              ...(updated.password !== undefined && {
                password: updated.password,
              }),
              ...(updated.role !== undefined && { role: updated.role }),
            }
          : u
      )
    );
  }, []);

  // -----------------------------
  // DELETE USER
  // -----------------------------
  const deleteUser = useCallback(async (id: number) => {
    await apiDeleteUser(id);

    setProfessores((prev) => prev.filter((u) => u.id !== id));
    setAlunos((prev) => prev.filter((u) => u.id !== id));
  }, []);

  // -----------------------------
  // LOAD DATA ON LOGIN
  // -----------------------------
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