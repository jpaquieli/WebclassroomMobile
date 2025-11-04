// src/services/authService.ts
import { api } from "./api";

export const authService = {
  async login(username: string, password: string) {
    const data = await api.request("/user/signin", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    return data;
  },
};