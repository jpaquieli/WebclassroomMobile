import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  deleteUser,
  findAllAluno,
  User,
} from "../../services/userService";

export default function AdminAlunoScreen() {
  const [alunos, setAlunos] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const data = await findAllAluno();
      setAlunos(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao carregar Alunos");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAlunos();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert(
      "Excluir Aluno",
      "Tem certeza que deseja excluir este Aluno?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteUser(id);
              setAlunos((prev) => prev.filter((p) => p.id !== id));
              Alert.alert("Sucesso", "Aluno excluído!");
            } catch (error: any) {
              Alert.alert("Erro", error.message || "Erro ao excluir Aluno");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Carregando Alunos...</Text>
      </SafeAreaView>
    );
  }

  if (alunos.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ fontSize: 16, color: "#555" }}>
          Nenhum aluno encontrado.
        </Text>
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => router.push("/aluno/create/create" as never)}
        >
          <Text style={styles.buttonText}>Cadastrar Aluno</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>alunos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/aluno/create/create" as never)}
        >
          <Ionicons name="add-circle" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id!.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.username}</Text>
              <Text style={styles.author}>ID: {item.id}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() =>
                  router.push({
                    pathname: "/aluno/edit/[id]",
                    params: { id: item.id!.toString() },
                  })
                }
              >
                <Ionicons name="create-outline" size={22} color="#007AFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDelete(item.id!)}
              >
                <Ionicons name="trash-outline" size={22} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  addButton: {
    padding: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  author: {
    fontSize: 13,
    color: "#777",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});