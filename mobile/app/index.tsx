import { Redirect, useRootNavigationState } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Index() {
  const { loading } = useAuth(); 
  const rootNavigationState = useRootNavigationState();
  const isReady = rootNavigationState?.key && !loading;

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  return <Redirect href={"/login"} />;
}