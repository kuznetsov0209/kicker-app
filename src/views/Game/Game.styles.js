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
  },

  teamImageContainer: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  robotImage: {
    alignItems: "flex-end"
  },
  humanImage: {
    alignItems: "flex-start"
  },
  teamImage: {
    width: 168,
    height: 360
  },

  sticker: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
    top: 120
  }
});

export default styles;
