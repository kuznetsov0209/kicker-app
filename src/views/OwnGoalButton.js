import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const OwnGoalButton = ({ color, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        width: 240,
        height: 64,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ fontFamily: "GothamPro-Black", fontSize: 18, color }}>
        OWN
      </Text>
    </View>
  </TouchableOpacity>
);

export default OwnGoalButton;
