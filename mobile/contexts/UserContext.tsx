// contexts/UsersContext.tsx
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
  
  type UsersProviderProps = {
    children: ReactNode;
  };
  
  const UsersContext = createContext<UsersContextType | undefined>(undefined);
  
  export const useUsers = (): UsersContextType => {
    const ctx = useContext(UsersContext);
    if (!ctx) throw new Error("useUsers deve ser usado dentro de UsersProvider");
    return ctx;
  };
  
  export function UsersProvider({ children }: UsersProviderProps) {
    const { user } = useAuth(); // garante que só carregamos quando há usuário autenticado
  
    const [professores, setProfessores] = useState<User[]>([]);
    const [alunos, setAlunos] = useState<User[]>([]);
  
    // Buscar professores
    const fetchProfessores = useCallback(async () => {
      try {
        const data = await apiFindAllProfessor();
        setProfessores(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao buscar professores:", err);
        setProfessores([]);
      }
    }, []);
  
    // Buscar alunos
    const fetchAlunos = useCallback(async () => {
      try {
        const data = await apiFindAllAluno();
        setAlunos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao buscar alunos:", err);
        setAlunos([]);
      }
    }, []);
  
    // Criar professor
    const createProfessor = useCallback(
      async (payload: Omit<User, "id" | "role">) => {
        try {
          const newUser = await apiCreateProfessor(payload);
          // insere no estado local (evita refetch completo)
          setProfessores((prev) => (newUser ? [...prev, newUser] : prev));
        } catch (err) {
          console.error("Erro ao criar professor:", err);
          throw err;
        }
      },
      []
    );
  
    // Criar aluno
    const createAluno = useCallback(
      async (payload: Omit<User, "id" | "role">) => {
        try {
          const newUser = await apiCreateAluno(payload);
          setAlunos((prev) => (newUser ? [...prev, newUser] : prev));
        } catch (err) {
          console.error("Erro ao criar aluno:", err);
          throw err;
        }
      },
      []
    );
  
    // Atualizar usuário (tanto professor quanto aluno)
    const updateUser = useCallback(async (id: number, data: Partial<User>) => {
      try {
        const updated = await apiEditUser(id, data);
  
        if (updated) {
          setProfessores((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
          setAlunos((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
        }
      } catch (err) {
        console.error("Erro ao editar usuário:", err);
        throw err;
      }
    }, []);
  
    // Deletar usuário
    const deleteUser = useCallback(async (id: number) => {
      try {
        await apiDeleteUser(id);
        setProfessores((prev) => prev.filter((u) => u.id !== id));
        setAlunos((prev) => prev.filter((u) => u.id !== id));
      } catch (err) {
        console.error("Erro ao deletar usuário:", err);
        throw err;
      }
    }, []);
  
    // Carregar listas quando o usuário logar (ou mudar)
    useEffect(() => {
      if (user) {
        fetchProfessores();
        fetchAlunos();
      } else {
        // limpa se logout
        setProfessores([]);
        setAlunos([]);
      }
    }, [user, fetchProfessores, fetchAlunos]);
  
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