import React from "react";
import LottieView from "lottie-react-native";

const IconAdd = () => (
  <LottieView
    source={require("./IconAdd.json")}
    autoPlay
    loop
    style={{ width: 60, height: 60 }}
  />
);

export default IconAdd;
