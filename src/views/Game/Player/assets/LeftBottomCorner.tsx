import React from "react";
import { Svg, G, Path, Circle, SvgProps } from "react-native-svg";

const LeftBottomCorner = (props: SvgProps) => (
  <Svg width="280" height="280" style={props.style} viewBox="0 0 280 280">
    <G fill="none" fillRule="evenodd">
      <Path fill="#FF234A" d="M176 280H0V46l176 234z" opacity=".2" />
      <Path fill="#FF234A" d="M234 280H0V104z" opacity=".2" />
      <G stroke="#FFF">
        <G strokeWidth="10" opacity=".05" transform="translate(24 231)">
          <Circle cx="17" cy="8" r="8" />
          <Path d="M16.957 4.488l3.329 2.418-1.271 3.913H14.9l-1.271-3.913z" />
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.5 6.5l-4 4M19.5 16.5l-4 4M9.5 19.5L.486 28.514M9.5 11.5l-7.018 7.018"
          />
          <Path strokeLinecap="square" d="M17 .5v4" />
        </G>
        <G strokeWidth="5" opacity=".1" transform="translate(24 231)">
          <Circle cx="17" cy="8" r="8" />
          <Path d="M16.957 4.488l3.329 2.418-1.271 3.913H14.9l-1.271-3.913z" />
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.5 6.5l-4 4M19.5 16.5l-4 4M9.5 19.5L.486 28.514M9.5 11.5l-7.018 7.018"
          />
          <Path strokeLinecap="square" d="M17 .5v4" />
        </G>
        <G strokeWidth="1.5" transform="translate(24 231)">
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

export default LeftBottomCorner;
