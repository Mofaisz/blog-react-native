import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import '../global.css';


function RootLayoutNav() {
  const { userToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (userToken) {
        router.replace("/(tabs)/home"); //change according to your convienence 
      } else {
        router.replace("/auth/login");
      }
    }
  }, [userToken, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ title: "Login" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
