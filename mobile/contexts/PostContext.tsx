import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import {
    createPost as apiCreatePost,
    deletePost as apiDeletePost,
    getPost as apiGetPost,
    getPosts as apiGetPosts,
    updatePost as apiUpdatePost,
} from "../services/postService.js";
import { useAuth } from "./AuthContext.js";

// 🔹 Tipo de um post
export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
};

// 🔹 Tipo do contexto
type PostsContextType = {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  getPost: (id: number) => Promise<Post | null>;
  createPost: (post: Omit<Post, "id">) => Promise<void>;
  updatePost: (id: number, updatedData: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
};

// 🔹 Props do provider
type PostsProviderProps = {
  children: ReactNode;
};

// Contexto
const PostsContext = createContext<PostsContextType | undefined>(undefined);

// Hook seguro
export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts deve ser usado dentro de um PostsProvider");
  }
  return context;
};

export function PostsProvider({ children }: PostsProviderProps) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  // 🔹 Pega todos os posts
  const fetchPosts = useCallback(async () => {
    try {
      const data = await apiGetPosts();
      setPosts(data);
    } catch (err) {
      console.error("Erro ao buscar posts:", err);
    }
  }, []);

  // 🔹 Pega um post específico
  const getPost = useCallback(
    async (id: number) => {
      const existing = posts.find((p) => p.id === id);
      if (existing) return existing;

      try {
        const data = await apiGetPost(id);
        return data;
      } catch (err) {
        console.error("Erro ao buscar post:", err);
        return null;
      }
    },
    [posts]
  );

  // 🔹 Cria um post
  const createPost = async (post: Omit<Post, "id">) => {
    try {
      const newPost = await apiCreatePost(post);
      setPosts((prev) => [newPost, ...prev]);
    } catch (err) {
      console.error("Erro ao criar post:", err);
    }
  };

  // 🔹 Atualiza um post
  const updatePost = async (id: number, updatedData: Partial<Post>) => {
    try {
      await apiUpdatePost(id, updatedData);
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
      );
    } catch (err) {
      console.error("Erro ao atualizar post:", err);
    }
  };

  // 🔹 Deleta um post
  const deletePost = async (id: number) => {
    try {
      await apiDeletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Erro ao deletar post:", err);
    }
  };

  // 🔹 Busca posts quando o usuário estiver logado
  useEffect(() => {
    if (user) fetchPosts();
  }, [user, fetchPosts]);

  return (
    <PostsContext.Provider
      value={{ posts, fetchPosts, getPost, createPost, updatePost, deletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
}