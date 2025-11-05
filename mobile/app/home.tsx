import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPosts, Post } from "../services/postService";

export default function HomeScreen() {
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

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{ marginTop: 10 }}>Carregando posts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (posts.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.center}>
          <Text style={styles.emptyText}>Nenhum post encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <FlatList
          data={posts}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
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
    fontWeight: "600",
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
    textAlign: "right",
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