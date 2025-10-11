import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
// import { Colors } from "react-native/Libraries/NewAppScreen";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#fbd38d",
        tabBarInactiveTintColor: "#a0aec0",
      }}
    >
      <Tabs.Screen
        name="home"
        
        options={{
          title:"Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? <Text style={{ color }}>Home</Text> : null,
        }}
      />
      <Tabs.Screen
        name="blogs" // this is where blogs.tsx is being recongonised
        options={{
          headerShown: false,
          title: "Blogs",
          //   headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? <Text style={{ color }}>Blogs</Text> : null,
        }}
      />

      <Tabs.Screen
        name="createBlogs"
        options={{
          title: "Create",
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-outline" color={color} size={size} />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? <Text style={{ color }}>Add</Text> : null,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? <Text style={{ color }}>Profile</Text> : null,
        }}
      />
    </Tabs>
  );
};

export default _layout;
