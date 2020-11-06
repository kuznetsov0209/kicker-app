import React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

const LogoArea = (props: SvgProps) => (
  <Svg width="302" height="92" viewBox="0 0 302 92" {...props}>
    <Path
      fill="#191919"
      fill-rule="evenodd"
      d="M48.97 0h204.06a12 12 0 0 1 8.485 3.515l38.242 38.242a6 6 0 0 1 0 8.486l-38.242 38.242A12 12 0 0 1 253.029 92H48.971a12 12 0 0 1-8.486-3.515L2.243 50.243a6 6 0 0 1 0-8.486L40.485 3.515A12 12 0 0 1 48.971 0z"
    />
  </Svg>
);

export default LogoArea;
