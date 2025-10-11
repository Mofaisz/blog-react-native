import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

interface ShareProps {
  id: number;
  onClose: () => void;
}

const Share = ({ id, onClose }: ShareProps) => {
  return (
    <>
      <Modal 
      onBackdropPress={onClose}
      isVisible={true}
      // className="bg-white w-full rounded-full h-[50%] "
      style ={{ justifyContent:"flex-end", margin:0 }}
      >
        <SafeAreaView
        className="">
          <ScrollView horizontal
          className="w-full max-h-[70%]">
            <View className="">
              <Text>
                Share to other Apps
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default Share;
