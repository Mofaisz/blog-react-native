import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

const createBlogs = () => {
  const { addBlog, loading } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async () => {
    try {
      const res = await addBlog(title, description, body);
      setTitle("");
      setDescription("");
      setBody("");
      Alert.alert(res.message);
    } catch (err: any) {
      console.error(err);
      Alert.alert("Upload Failed", err?.response?.data?.detail || err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fffbeb" }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 ">
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 120, // Leaves space for button
              paddingHorizontal: 16,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View
              className="bg-white rounded-3xl mt-40 min-h-[500px] mx-4  shadow-lg focus:border-[#fde047]"
              style={{
                shadowColor: "black", 
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <View className="items-center mt-4">
                <Text className="text-3xl font-bold italic text-[#fcd34d]">
                  Write your Blogs
                </Text>
              </View>
              {/* Title */}
              <View className="flex flex-row items-center mx-4 border-b border-gray-400 px-3 py-2 bg-white mt-4 focus:border-[#fde047]">
                <Text className="mr-2 text-gray-800 text-lg font-bold">
                  Title :
                </Text>
                <TextInput
                  className="flex-1 text-base"
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Title of your blog..."
                  placeholderTextColor="#9ca3af"
                  multiline
                  textAlignVertical="top"
                />
              </View>

              {/* Description */}
              <View className="flex flex-row items-center mt-4 mx-4 border-b border-gray-400 px-3 py-2 focus:border-[#fde047]">
                <Text className="mr-2 text-gray-800 text-lg font-bold">
                  Description :
                </Text>
                <TextInput
                  className="flex-1 text-base"
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Description of your blog"
                  placeholderTextColor="#9ca3af"
                  multiline
                  textAlignVertical="top"
                />
              </View>

              {/* Body */}
              <View className="mx-4 mt-10">
                <TextInput
                  value={body}
                  onChangeText={setBody}
                  placeholder="Write your blog content here..."
                  placeholderTextColor="#9ca3af"
                  className="flex-1 min-h-[250] border border-gray-300 rounded-xl p-4 focus:border-[#fde047]"
                  multiline
                  textAlignVertical="top"
                  style={{ textAlignVertical: "top" }}
                />
              </View>
            </View>
          </ScrollView>

          {/* Fixed button that stays above keyboard */}
          <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-t-[#e5e7eb] p-4">
            <Pressable
              onPress={onSubmit}
              disabled={
                !(
                  title.length > 0 &&
                  description.length > 0 &&
                  body.length > 0
                ) || loading
              }
              className={`rounded-xl py-4 items-center ${
                title.length > 0 &&
                description.length > 0 &&
                body.length > 0 &&
                !loading
                  ? "bg-[#fcd34d]"
                  : "bg-[#fde68a]"
              }`}
            >
              {loading ? (
                <ActivityIndicator color="#78350f" />
              ) : (
                <Text className="text-[#78350f] text-lg font-semibold">
                  Upload
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default createBlogs;
