import { Tabs } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

export default function TabsLayout() {
  const { isProfessor } = useAuth();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />

      {isProfessor && (
        <Tabs.Screen
          name="admin"
          options={{
            title: "Admin",
          }}
        />
      )}
    </Tabs>
  );
}