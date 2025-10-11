import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

const login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await signIn(email, password);
      // setLoading(false);
    } catch (err) {
      Alert.alert("Login failed", "invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = email.trim().length === 0 || password.trim().length === 0;

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}
        className="flex-1 justify-center"
      >
        <View className="flex-1 justify-center p-4">
          <TextInput
            placeholder="Email.."
            className="bg-[#d1d5db] p-4 mb-3 rounded-lg"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="bg-[#d1d5db] p-4 mb-3 rounded-lg"
            value={password}
            onChangeText={setPassword}
          />
          <Pressable className="mt-2 mb-2">
            <Text>Forget Password?</Text>
          </Pressable>

          {loading ? (
            <ActivityIndicator
              size={"small"}
              color="#000"
              className="bg-[#a1a1aa] mt-2 p-4 mb-3 rounded-lg justify-center items-center"
            />
          ) : (
            <Pressable
              className={` mt-2 p-4 mb-3 rounded-lg justify-center items-center ${isDisabled ? "bg-[#a1a1aa]" : "bg-black"}`}
              onPress={onSubmit}
              disabled={isDisabled}
            >
              <Text
                className={`text-white font-semibold text-lg ${isDisabled ? "text-[white]" : "text-white"}`}
              >
                Login
              </Text>
            </Pressable>
          )}
          <Pressable onPress={() => router.push("./signup")}>
            <Text>{`Don't have an account? Sign Up!`}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default login;
