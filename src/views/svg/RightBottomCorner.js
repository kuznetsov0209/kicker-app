import React from "react";
import { View } from "react-native";
import { Svg, Path, G } from "react-native-svg";

const RightBottomCorner = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="280"
    height="280"
    viewBox="0 0 280 280"
  >
    <G fill="none" fillRule="evenodd">
      <Path fill="#FF234A" d="M104 280h176V46L104 280z" opacity=".2" />
      <Path fill="#FF234A" d="M46 280h234V104z" opacity=".2" />
    </G>
  </Svg>
);

export default RightBottomCorner;
