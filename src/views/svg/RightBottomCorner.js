import React from "react";
import { Svg, Path, G } from "react-native-svg";

const RightBottomCorner = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="280"
    height="280"
    viewBox="0 0 280 280"
  >
    <G fill="none" fillRule="evenodd">
      <Path fill="#235CFF" d="M104 280h176V46L104 280z" opacity=".2" />
      <Path fill="#235CFF" d="M46 280h234V104z" opacity=".2" />
    </G>
  </Svg>
);

export default RightBottomCorner;
