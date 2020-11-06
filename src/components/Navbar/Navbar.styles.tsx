import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  link: {
    width: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  linkText: {
    fontFamily: "GothamPro-Black",
    fontSize: 14,
    letterSpacing: 0.8,
    color: "white",
    opacity: 0.5,
    textAlign: "center"
  },
  linkActive: {
    opacity: 1
  },
  undeline: {
    height: 3,
    backgroundColor: "white",
    top: 11
  },
  navbar: {
    height: 80,
    backgroundColor: "black"
  },
  navbarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
