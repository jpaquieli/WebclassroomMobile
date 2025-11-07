import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
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
      </Stack>
    </AuthProvider>
  );
}