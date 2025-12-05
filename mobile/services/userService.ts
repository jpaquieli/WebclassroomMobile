import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api"; // Axios configurado

export type User = {
    id?: number;
    username: string;
    password: string;
    role: "professor" | "aluno";
};

async function getAuthHeader() {
  const token = await AsyncStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

export async function signin(email: string, password: string) {
  try {
    const res = await api.post("/user/signin", { email, password });

    if (res.data?.token) {
      await AsyncStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao fazer login");
  }
}

export async function createProfessor(user: Omit<User, "id" | "role">) {
  try {
    const headers = await getAuthHeader();
    const res = await api.post("/user/professor", user, { headers });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao criar professor");
  }
}

export async function createAluno(user: Omit<User, "id" | "role">) {
  try {
    const headers = await getAuthHeader();
    const res = await api.post("/user/aluno", user, { headers });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao criar aluno");
  }
}

export async function editUser(id: number, data: Partial<User>) {
  try {
    const headers = await getAuthHeader();
    const res = await api.patch(`/user/${id}`, data, { headers });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao editar usuário");
  }
}

export async function findAllProfessor() {
  try {
    const headers = await getAuthHeader();
    const res = await api.get<User[]>("/user/professor", { headers });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao listar professores");
  }
}

export async function findAllAluno() {
  try {
    const headers = await getAuthHeader();
    const res = await api.get<User[]>("/user/aluno", { headers });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao listar alunos");
  }
}

export async function deleteUser(id: number) {
  try {
    const headers = await getAuthHeader();
    await api.delete(`/user/${id}`, { headers });
  } catch (error: any) {
    throw new Error(error.message || "Erro ao deletar usuário");
  }
}