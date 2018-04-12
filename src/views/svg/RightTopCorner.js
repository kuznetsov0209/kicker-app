import React from "react";
import { View } from "react-native";
import { Svg, Path, G } from "react-native-svg";

const RightTopCorner = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="280"
    height="280"
    viewBox="0 0 280 280"
  >
    <G fill="none" fillRule="evenodd">
      <Path fill="#FF234A" d="M104 0h176v234L104 0z" opacity=".2" />
      <Path fill="#FF234A" d="M46 0h234v176z" opacity=".2" />
    </G>
  </Svg>
);

export default RightTopCorner;
