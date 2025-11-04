import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  // Simula um token para autenticação (aqui você pode conectar ao seu auth real)
  const token = null; // ou string do token quando logado

  useEffect(() => {
    if (!token) {
      // Navega para login
      router.replace("/login");
    } else {
      // Se estiver logado, vai para home
      router.replace("/home");
    }
  }, [router, token]);

  return null; // Nada a renderizar aqui
}