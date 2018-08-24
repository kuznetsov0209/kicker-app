import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textContainer: {
    position: "relative"
  },
  textShadow: {
    fontFamily: "GothamPro-Black",
    color: "rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    position: "absolute",
    top: 4,
    letterSpacing: 1.3
  },
  text: {
    fontFamily: "GothamPro-Black",
    textAlign: "center"
  }
});

const Button = ({ color, onPress, children, primary, width, padding }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        width,
        height: 64,
        borderWidth: primary ? 4 : 0,
        borderColor: color,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <View style={styles.textContainer}>
        {primary && (
          <Text style={[styles.textShadow, { fontSize: primary ? 24 : 18 }]}>
            {children}
          </Text>
        )}
        <Text style={[styles.text, { fontSize: primary ? 24 : 18, color }]}>
          {children}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default Button;
