import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createProfessor } from "../../../services/userService";

export default function CreateProfessorScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!username.trim()) {
      Alert.alert("Atenção", "O campo usuário é obrigatório.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Atenção", "A senha é obrigatória para criar um professor.");
      return;
    }

    try {
      setLoading(true);

      await createProfessor({
        username,
        password, // 👈 senha OBRIGATÓRIA na criação
      });

      Alert.alert("Sucesso", "Professor criado com sucesso!");
      router.replace("/adminProfessor");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Cadastrar Professor</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Salvar</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});