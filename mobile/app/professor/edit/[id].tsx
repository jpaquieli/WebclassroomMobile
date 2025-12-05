// app/professor/edit/[id].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUsers } from "../../../contexts/UserContext";

export default function EditProfessorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { professores, updateUser, fetchProfessores } = useUsers();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // --- Carrega sempre o dado REAL do contexto ---
  useEffect(() => {
    const prof = professores.find((p) => p.id === Number(id));

    if (prof) {
      setUsername(prof.username);
      setPassword(""); // não exibe senha, apenas permite trocar
    }

    setLoading(false);
  }, [id, professores]);

  const handleSave = async () => {
    setSaving(true);

    try {
      await updateUser(Number(id), {
        username: username || undefined,
        password: password || undefined,
      });

      // 🔥 Atualiza lista REAL após editar
      await fetchProfessores();

      Alert.alert("Sucesso", "Professor atualizado!");

      router.back();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Editar Professor</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Nova senha (opcional)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Salvar Alterações</Text>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
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
  },
});