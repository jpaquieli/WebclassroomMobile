import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AdminScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Painel do Administrador</Text>
      <Text style={styles.subtext}>Gerencie seus posts aqui</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, fontWeight: "bold" },
  subtext: { marginTop: 8, fontSize: 16, color: "#666" },
});