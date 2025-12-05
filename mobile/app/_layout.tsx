import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { UsersProvider } from "../contexts/UserContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <UsersProvider>
        <Stack
          screenOptions={{
            headerShown: true,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />

          <Stack.Screen
            name="post/[id]"
            options={{
              headerShown: true,
              headerTitle: "Detalhes do Post",
              headerBackTitle: "Voltar",
              animation: "slide_from_right",
            }}
          />

          <Stack.Screen
            name="adminProfessor"
            options={{
              headerShown: true,
              headerTitle: "Professores",
            }}
          />

          <Stack.Screen
            name="adminAluno"
            options={{
              headerShown: true,
              headerTitle: "Alunos",
            }}
          />
        </Stack>
      </UsersProvider>
    </AuthProvider>
  );
}