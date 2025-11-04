import axios from "axios";

// Cria uma instância configurada do Axios
export const api = axios.create({
  baseURL: "http://localhost:3000/v1", // ajuste se necessário
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// Interceptor de resposta — trata erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Erro desconhecido no servidor";

    if (error.response) {
      // Erro vindo da API
      message = error.response.data?.message || `Erro: ${error.response.status}`;
    } else if (error.request) {
      // Nenhuma resposta recebida
      message = "Não foi possível conectar ao servidor.";
    } else {
      // Erro ao configurar a requisição
      message = error.message;
    }

    return Promise.reject(new Error(message));
  }
);