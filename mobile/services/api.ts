// src/services/api.ts

export const api = {
    async request(path: string, options?: RequestInit) {
      const baseUrl = "http://localhost:3000/v1"; // ou o IP da sua máquina/emulador
  
      const response = await fetch(baseUrl + path, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",  // <== CORREÇÃO AQUI
          ...(options?.headers || {}),
        },
        ...options,
      });
  
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // não conseguiu ler o JSON do erro
        }
        throw new Error(errorMessage);
      }
  
      return await response.json();
    },
  };