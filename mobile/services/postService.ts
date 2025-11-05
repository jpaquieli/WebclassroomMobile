import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api"; // seu api.ts com Axios

export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
};

// Função auxiliar para obter o token
async function getAuthHeader() {
  const token = await AsyncStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

export async function getPosts(): Promise<Post[]> {
  try {
    const headers = await getAuthHeader();
    const res = await api.get<Post[]>("/post", { headers });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao buscar posts");
  }
}

export async function getPost(id: number): Promise<Post> {
  try {
    const headers = await getAuthHeader();
    const res = await api.get<Post>(`/post/${id}`, { headers });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao buscar post");
  }
}

export async function createPost(post: Omit<Post, "id">): Promise<Post> {
  try {
    const headers = await getAuthHeader();
    const res = await api.post<Post>("/post", post, { headers });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao criar post");
  }
}

export async function updatePost(
  id: number,
  post: Partial<Omit<Post, "id">>
): Promise<Post> {
  try {
    const headers = await getAuthHeader();
    const res = await api.patch<Post>(`/post/${id}`, post, { headers });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao atualizar post");
  }
}

export async function deletePost(id: number): Promise<void> {
  try {
    const headers = await getAuthHeader();
    await api.delete(`/post/${id}`, { headers });
  } catch (error: any) {
    throw new Error(error.message || "Erro ao deletar post");
  }
}