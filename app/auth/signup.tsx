import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View, TextInput, Alert } from "react-native";

const SignUp = () => {
  const { signUp } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      await signUp(username, email, password);
      Alert.alert("Success", "Account created and will be redirect to login page!");
      router.replace("./login")
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <>
      <View className="flex-1 justify-center p-4 bg-[white]">
        <View className="justify-center items-center mb-4">
          <Text className="text-2xl text-bold ">Create account on bloggy</Text>
        </View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="bg-[#d1d5db] p-4 mb-3 rounded-lg border-none"
        />
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          className="bg-[#d1d5db] p-4 mb-3 rounded-lg"
        />
        <TextInput
          placeholder="Set Password"
          value={password}
          onChangeText={setPassword}
          className="bg-[#d1d5db] p-4 mb-3 rounded-lg"
        />
        <Pressable
          className="bg-[black] mt-4 p-4 mb-3 rounded-lg justify-center items-center"
          onPress={onSubmit}
        >
          <Text className="text-white font-semibold text-lg">Submit</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SignUp;
