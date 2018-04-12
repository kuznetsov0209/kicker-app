import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const GoalButton = ({ color, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        width: 240,
        height: 64,
        borderWidth: 4,
        borderColor: color,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ fontFamily: "GothamPro-Black", fontSize: 24, color }}>
        GOAL
      </Text>
    </View>
  </TouchableOpacity>
);

export default GoalButton;
