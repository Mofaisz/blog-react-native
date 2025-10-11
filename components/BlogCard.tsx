import {
  Heart,
  MessageCircle,
  MoreVertical,
  Share2,
} from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AnimatedUsername from "./AnimatedUsername";
import { red } from "react-native-reanimated/lib/typescript/Colors";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import blog from "@/app/(tabs)/blogs";
import { useRouter } from "expo-router";
import Comment from "./Comment";
import Share from "./Share"

interface Blog {
  id: number;
  title: string;
  body: string;
  owner: {
    name: string;
    email: string;
  };
}

const BlogCard = ({ id, title, body, owner }: Blog) => {
  const { postLikes, fetchLikes, getComments } = useAuth();
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments,setTotalComments] = useState(0)
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [openShare,setOpenShare] = useState(false)

  useEffect(() => {
    (async () => {
      let likesCount = await fetchLikes(id);
      let fetchComments = await getComments(id)
      setTotalLikes(likesCount.likes);
      setIsLiked(likesCount["Liked-by"]);
      setTotalComments(fetchComments.total_comment)
      // console.log(setTotalComments)
    })();
  }, [id]);

  const addLike = async () => {
    try {
      await postLikes(id);
      let likesCount = await fetchLikes(id);
      setIsLiked(likesCount["Liked-by"]);
      setTotalLikes(likesCount.likes);
      // setTotalLikes()
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return (
    <>
      <View className="flex-1  justify-between p-0 m-0 rounded-3xl shadow-md bg-white overflow-hidden">
        {/* header */}
        <View className="flex-row justify-between mb-2 border-b border-gray-200 p-4 bg-[#f8fafc]">
          <View className="flex-row">
            <Image
              source={require("../icons/profilePic.jpeg")}
              className="w-10 h-10 rounded-full mr-2"
            />
            <AnimatedUsername name={owner.name} />
          </View>
          <TouchableOpacity>
            <MoreVertical size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View className="bg-[gray] w-[80%] self-center h-40 items-center rounded-xl mt-2">
          <Text className=""> Image</Text>
        </View>

        {/* content */}
        <View className="m-10 mt-4">
          <Text
            className="font-semibold text-xl justify-center text-black text-gray-800"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text className="text-sm mt-4 text-gray-700" numberOfLines={4}>
            {body}
          </Text>
        </View>

        {/* Action items like likes,comment and share */}
        <View className="flex-row justify-around rounded-xl  bg-[#f8fafc] border-t border-gray-200 pt-4 pb-4 ">
          <TouchableOpacity
            onPress={addLike}
            className="flex-row items-center gap-2"
          >
            <Heart color={isLiked ? "red" : "black"} />
            <Text className="text-sm ">{totalLikes}</Text>
          </TouchableOpacity>

          <View
          className="pr-2 pl-2"
          >

          <TouchableOpacity onPress={() => setShowComments(true)}
          className="flex-row justify-center items-center gap-2"
            >
            <MessageCircle />
            {showComments && <Comment id={id} onClose={() => setShowComments(false)} />}
              <Text className="text-sm">{totalComments}</Text>
          </TouchableOpacity>
          </View>

          <TouchableOpacity
          onPress={() => setOpenShare(true)}
          >
            <Share2 />
    {openShare && <Share id = {id} onClose={() => setOpenShare(false)} />}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default BlogCard;
