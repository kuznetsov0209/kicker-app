import React from "react";
import LottieView from "lottie-react-native";

const Stars = () => (
  <LottieView source={require("./Stars.json")} autoPlay loop={false} />
);

export default Stars;
