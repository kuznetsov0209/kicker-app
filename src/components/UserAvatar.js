import React from "react";
import { View, Image, Text } from "react-native";

const UserAvatar = ({ user, size, color, ...rest }) => (
  <View style={{ borderRadius: size / 2, overflow: "hidden" }}>
    {user.photoUrl ? (
      <Image
        source={{ uri: user.photoUrl }}
        style={{ width: size, height: size }}
        {...rest}
      />
    ) : (
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: color || "#ff234a",
          alignItems: "center",
          justifyContent: "center"
        }}
        {...rest}
      >
        <Text style={{ color: "white", fontSize: size / 2 }}>
          {user.name
            .split(" ")
            .map(word => word[0])
            .slice(0, 2)
            .join("")}
        </Text>
      </View>
    )}
  </View>
);

export default UserAvatar;
