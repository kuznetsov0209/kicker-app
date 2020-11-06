import React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

const IconCross = (props: SvgProps) => (
  <Svg width="40" height="40" viewBox="0 0 40 40" {...props}>
    <Path
      fill="#FF234A"
      d="M10.929 8.1A2 2 0 0 0 8.1 10.93L17.17 20l-9.07 9.071a2 2 0 1 0 2.828 2.828L20 22.83l9.071 9.07a2 2 0 1 0 2.828-2.828L22.83 20l9.07-9.071A2 2 0 1 0 29.071 8.1L20 17.17l-9.071-9.07z"
    />
  </Svg>
);

export default IconCross;
