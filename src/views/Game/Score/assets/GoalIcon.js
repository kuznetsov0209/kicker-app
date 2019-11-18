import React from "react";
import LottieView from "lottie-react-native";

const GoalIcon = () => (
  <LottieView source={require("./GoalIcon.json")} autoPlay loop={false} />
);

export default GoalIcon;
