import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { getPosts, Post } from "../services/postService";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const { isProfessor } = useAuth();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error: any) {
      console.error("Erro ao carregar posts:", error.message);
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

  useEffect(() => {
    const filtered = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Carregando posts...</Text>
      </View>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <View style={styles.container}>
        {isProfessor && (
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => router.push("/admin")}
          >
            <Ionicons name="settings-outline" size={18} color="#fff" />
            <Text style={styles.adminButtonText}>Painel Administrativo</Text>
          </TouchableOpacity>
        )}

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar posts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.center}>
          <Text style={styles.emptyText}>Nenhum post encontrado</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
{isProfessor && (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.adminButtonsContainer}
  >
    <TouchableOpacity
      style={styles.adminButton}
      onPress={() => router.push("/admin")}
    >
      <Ionicons name="settings-outline" size={20} color="#fff" />
      <Text style={styles.adminButtonText}>Posts</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.adminButton}
      onPress={() => router.push("/adminProfessor")}
    >
      <Ionicons name="school-outline" size={20} color="#fff" />
      <Text style={styles.adminButtonText}>Professores</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.adminButton}
      onPress={() => router.push("/adminAluno")}
    >
      <Ionicons name="people-outline" size={20} color="#fff" />
      <Text style={styles.adminButtonText}>Alunos</Text>
    </TouchableOpacity>
  </ScrollView>
)}

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar posts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#aaa"
        />
      </View>

      <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/post/[id]" as any,
                  params: {
                    id: item.id.toString(),
                    title: item.title,
                    content: item.content,
                    author: item.author,
                    createdAt: item.createdAt,
                  },
                })
              }
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.contentPreview} numberOfLines={2}>
                {item.content}
              </Text>
              <View style={styles.footer}>
                <Text style={styles.author}>por {item.author}</Text>
                {item.createdAt && (
                  <Text style={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
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
  },

  adminButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 2,
  },

  adminButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 10,

    width: 150,
    height: 45,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },

  adminButtonText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "600",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },

  icon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },
  contentPreview: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  author: {
    fontSize: 13,
    color: "#777",
  },
  date: {
    fontSize: 12,
    color: "#aaa",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});