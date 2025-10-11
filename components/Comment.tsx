import { useAuth } from "@/context/AuthContext";
import { CircleArrowUp } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  FlatList,
  RefreshControl,
  Platform,
  Image,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import AnimatedUsername from "./AnimatedUsername";

interface CommentProps {
  onClose: () => void;
  id: number;
}

const Comment = ({ id, onClose }: CommentProps) => {
  const [commentValue, setCommentValue] = useState("");
  const [comment, setComment] = useState<any[]>([]);
  const [refreshComment, setRefreshComment] = useState(false);
  const { addComment, getComments } = useAuth();

  const fetchComments = async () => {
    try {
      const data = await getComments(id);
      setComment(data?.comments || []);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [id]);

  const onRefresh = async () => {
    setRefreshComment(true);
    await fetchComments();
    setRefreshComment(false);
  };

  const sendComment = async () => {
    Keyboard.dismiss()
    await addComment(id, commentValue);
    setCommentValue("");
    await fetchComments();

    Alert.alert("comment successfully added");
  };

  const isDisabled = commentValue.trim().length === 0;

  return (
    <>
      <Modal
        onBackdropPress={onClose}
        isVisible={true}
        // react-native-modal does not fully support
        //    className="flex-1 justify-end m-0"
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}
          className="bg-white w-full rounded-3xl flex-1 max-h-[60%]"
        
        >
          <View className="border-b justify-center items-center p-4 ">
            <Text className="font-bold">Comments</Text>
          </View>
          {/* display comments */}
          <View className="bg-white rounded-t-2xl h-[80%]">
            <FlatList
              data={comment}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="border-b border-gray-200 p-4 gap-2 z-[1] ">
                  {/* <Text className="font-semibold">{item.user}</Text> */}
                  <View className="flex-row z-[1]">
                    <Image
                      source={require("../icons/profilePic.jpeg")}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <View className="mt-[-4px] z-[1] mr-4">
                      <AnimatedUsername name={item.user.name} />
                      <Text className="text-gray-700 mr-4">{item.content}</Text>
                    </View>
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <Text className="text-center text-gray-400">
                  No comments yet
                </Text>
              }
              refreshControl={
                <RefreshControl
                  refreshing={refreshComment}
                  onRefresh={onRefresh}
                />
              }
              keyboardShouldPersistTaps="always"
            />
          </View>
          <View className="absolute bottom-0  flex-row items-center border-t border-gray-300 p-3 bg-white">
            <TextInput
              value={commentValue}
              onChangeText={setCommentValue}
              placeholder="Write a comment..."
              className="flex-1 bg-gray-100 rounded-xl px-4 py-2 mr-2"
            />
            <Pressable
              className={`bg-blue-500 px-4 py-2 rounded-full circle ${
                isDisabled ? "bg-white" : " bg-blue-500"
              }`}
              onPress={sendComment}
              disabled={isDisabled}
            >
              <CircleArrowUp size={20} color="white" className="bg-white" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default Comment;
