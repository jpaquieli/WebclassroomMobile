import { Redirect, useRootNavigationState } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
// Importamos o seu hook que JÁ FUNCIONA
import { useAuth } from "../contexts/AuthContext";

export default function Index() {
  // 1. Usamos 'token' e 'loading' EXATAMENTE como vêm do seu contexto.
  const { token, loading } = useAuth(); 
  const rootNavigationState = useRootNavigationState();

  // 2. Condição de PRONTO: O roteador está montado E o carregamento do auth terminou (loading === false)
  const isReady = rootNavigationState?.key && !loading;

  // 3. 🔄 Mostra o loader se o roteador OU a autenticação estiverem carregando.
  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // 4. Quando estiver pronto, redireciona usando <Redirect /> (resolve o ERROR)
  const route = token ? "/home" : "/login";
  return <Redirect href={route} />;
}