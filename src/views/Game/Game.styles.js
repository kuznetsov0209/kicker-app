import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navbarLogoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  switcButton: {
    position: "absolute",
    top: "50%",
    width: 120,
    height: 120,
    marginTop: -60,
    zIndex: 1
  },
  switcButtonLeft: {
    left: 48
  },
  switcButtonRight: {
    right: 48
  }
});

export default styles;
