import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden"
  },
  iconLeftTop: {
    position: "absolute",
    left: 0,
    top: 0
  },
  iconLeftBottom: {
    position: "absolute",
    left: 0,
    bottom: 0
  },
  iconRightTop: {
    position: "absolute",
    right: 0,
    top: 0
  },
  iconRightBottom: {
    position: "absolute",
    right: 0,
    bottom: 0
  },

  addButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    width: 120,
    height: 120
  },

  userName: {
    fontFamily: "GothamPro-Black",
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 1
  }
});

export default styles;
