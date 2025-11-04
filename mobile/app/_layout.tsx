import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Slot } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

function Root() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Se não tem token, renderiza rota /login
  if (!token) {
    return <Slot />; // rota login
  }

  // Se tem token, renderiza /home e demais rotas autenticadas
  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}