import { Stack } from "expo-router";
import React from "react";
// 1. IMPORTANTE: Precisamos do AuthProvider para o app/index.tsx funcionar
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    // 2. O PROVIDER DEVE ENVOLVER O STACK
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {/* Abas principais (Rotas protegidas) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* 3. ADICIONADO: Tela de Login (Rota pública) */}
        {/* O index.tsx redireciona para 'login', o Stack precisa saber que essa tela existe. */}
        <Stack.Screen name="login" options={{ headerShown: false }} />

        {/* Tela de detalhes de post (provavelmente protegida) */}
        <Stack.Screen
          name="post/[id]"
          options={{
            headerShown: true,
            headerTitle: "Detalhes do Post",
            headerBackTitle: "Voltar",
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}