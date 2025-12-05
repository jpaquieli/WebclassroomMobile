import { Stack } from "expo-router";

export default function PostsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{ title: "Criar Usuário Professor" }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{ title: "Editar Usuário Professor" }}
      />
    </Stack>
  );
}