import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  score: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -220,
    marginTop: -260,
    width: 440,
    height: 520
  },
  scoreContainer: {
    position: "absolute",
    left: 0,
    top: 5,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  scoreTextContainer: {
    position: "relative"
  },
  scoreShadow: {
    fontSize: 66,
    fontFamily: "GothamPro-Black",
    color: "rgba(0, 0, 0, 0.1)",
    width: 150,
    textAlign: "center",
    position: "absolute"
  },
  scoreShadowLeft: {
    left: 4,
    top: 8
  },
  scoreShadowRight: {
    left: -4,
    top: -8
  },
  scoreText: {
    fontSize: 66,
    fontFamily: "GothamPro-Black",
    color: "white",
    width: 150,
    textAlign: "center",
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12
  },
  startButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -120,
    marginTop: -32,
    zIndex: 1
  },
  spinner: {
    marginLeft: 100
  },
  qrcode: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -110,
    marginTop: -110,
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#ed4159",
    overflow: "hidden"
  }
});

export default styles;
