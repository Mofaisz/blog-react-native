import { useAuth } from "@/context/AuthContext";
import { View, Text, Button } from "react-native";

const Profile = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>Profile page</Text>
      <Button title="Logout" onPress={signOut} />;
    </View>
  );
};

export default Profile;
