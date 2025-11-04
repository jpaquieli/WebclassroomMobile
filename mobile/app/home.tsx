// home.tsx

import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const navigation = useNavigation<any>(); // evita erro de tipos
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.navigate("login"); // navega para a tela Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Inicial</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});