import React from "react";
import { Svg, G, Path, Circle } from "react-native-svg";

const RightTopCorner = ({ style }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="280"
    height="280"
    viewBox="0 0 280 280"
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path fill="#235CFF" d="M104 0h176v234L104 0z" opacity=".2" />
      <Path fill="#235CFF" d="M46 0h234v176z" opacity=".2" />
      <G stroke="#FFF">
        <G strokeWidth="10" opacity=".05" transform="translate(231 22)">
          <Circle cx="17" cy="8" r="8" />
          <Path d="M16.957 4.488l3.329 2.418-1.271 3.913H14.9l-1.271-3.913z" />
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.5 6.5l-4 4M19.5 16.5l-4 4M9.5 19.5L.486 28.514M9.5 11.5l-7.018 7.018"
          />
          <Path strokeLinecap="square" d="M17 .5v4" />
        </G>
        <G strokeWidth="5" opacity=".1" transform="translate(231 22)">
          <Circle cx="17" cy="8" r="8" />
          <Path d="M16.957 4.488l3.329 2.418-1.271 3.913H14.9l-1.271-3.913z" />
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.5 6.5l-4 4M19.5 16.5l-4 4M9.5 19.5L.486 28.514M9.5 11.5l-7.018 7.018"
          />
          <Path strokeLinecap="square" d="M17 .5v4" />
        </G>
        <G strokeWidth="1.5" transform="translate(231 22)">
          <Circle cx="17" cy="8" r="8" />
          <Path d="M16.957 4.488l3.329 2.418-1.271 3.913H14.9l-1.271-3.913z" />
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.5 6.5l-4 4M19.5 16.5l-4 4M9.5 19.5L.486 28.514M9.5 11.5l-7.018 7.018"
          />
          <Path strokeLinecap="square" d="M17 .5v4" />
        </G>
      </G>
    </G>
  </Svg>
);

export default RightTopCorner;
