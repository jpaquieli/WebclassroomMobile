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
import { deletePost, getPosts, Post } from "../../services/postService";

export default function AdminScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao carregar postagens");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert(
      "Excluir Post",
      "Tem certeza que deseja excluir esta postagem?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePost(id);
              setPosts((prev) => prev.filter((p) => p.id !== id));
              Alert.alert("Sucesso", "Postagem excluída!");
            } catch (error: any) {
              Alert.alert("Erro", error.message || "Erro ao excluir postagem");
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
        <Text style={{ marginTop: 10 }}>Carregando postagens...</Text>
      </SafeAreaView>
    );
  }

  if (posts.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ fontSize: 16, color: "#555" }}>
          Nenhuma postagem encontrada.
        </Text>
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => router.push("/post/create/create" as never)}
        >
          <Text style={styles.buttonText}>Criar nova postagem</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Painel Administrativo</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/post/create/create" as never)}
        >
          <Ionicons name="add-circle" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>por {item.author}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() =>
                    router.push({
                      pathname: "/post/edit/[id]",
                      params: { id: item.id.toString() },
                    } as any)
                  }
              >
                <Ionicons name="create-outline" size={22} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDelete(item.id)}
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
    marginBottom: 4,
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