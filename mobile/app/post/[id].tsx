import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetailScreen() {
  const { id, title, content, author, createdAt } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Botão Voltar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>◀ Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.id}>ID: {id}</Text>
        <Text style={styles.author}>por {author}</Text>
        {createdAt && (
          <Text style={styles.date}>
            {new Date(createdAt as string).toLocaleDateString("pt-BR")}
          </Text>
        )}
        <View style={styles.separator} />
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  id: {
    fontSize: 13,
    color: "#aaa",
    marginBottom: 6,
  },
  author: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  date: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 12,
  },
  content: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
});