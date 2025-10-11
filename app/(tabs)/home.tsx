import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import BlogCard from "@/components/BlogCard";

const home = () => {
  const { allBlog } = useAuth();
  const [blog, setBlog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchBlogs = async () => {
    try {
      const data = await allBlog();
      setBlog(data);
    } catch (err: any) {
      console.log(err);
      Alert.alert(
        "Error in fetching blogs from API",
        err?.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const onRefresh = async () => {
    setRefresh(true);
    await fetchBlogs();
    setRefresh(false);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={"large"} color="#78350f" />
      </View>
    );
  }

  return (
    <>
      <View className="flex-1 mt-4">

        <FlatList
          data={blog}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          // contentContainerStyle={{ alignItems:"center"}}
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={({ item }) => (
            <View className=" w-[90%] h-[480px] self-center bg-white rounded-3xl shadow-lg shadow-black">
              <BlogCard {...item} />
            </View>
          )}
          refreshing={loading}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
};

export default home;
