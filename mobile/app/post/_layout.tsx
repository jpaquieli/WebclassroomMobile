import { Stack } from "expo-router";

export default function PostsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{ title: "Criar Postagem" }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{ title: "Editar Postagem" }}
      />
    </Stack>
  );
}