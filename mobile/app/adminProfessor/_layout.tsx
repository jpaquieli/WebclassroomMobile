import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminLayout() {
  const { loading, isProfessor } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isProfessor) {
    return <Redirect href="/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitle: "Administração",
        headerBackTitle: "Voltar",
        animation: "slide_from_right",
      }}
    />
  );
}