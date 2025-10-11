import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const AnimatedUsername = ({ name }: { name: string }) => {
  return (
    <Animated.Text
      entering={FadeInDown.duration(800).springify()}
      className="text font-bold capitalize text-gray-600 mt-2"
    >
      {name}
    </Animated.Text>
  );
};

export default AnimatedUsername;
