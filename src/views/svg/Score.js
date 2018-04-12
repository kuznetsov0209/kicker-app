import React from "react";
import { Svg, Path, G } from "react-native-svg";

const Score = props => (
  <Svg width="440" height="520" viewBox="0 0 440 520" {...props}>
    <G fill="none" fill-rule="evenodd">
      <Path fill="#FF234A" d="M392 260L220 462V220h112z" opacity=".2" />
      <Path fill="#FF234A" d="M392 260L220 432V200h112z" />
      <Path fill="#FF234A" d="M220 200v-43l43 43z" opacity=".2" />
      <Path fill="#FF234A" d="M220 200v-73l43 73z" opacity=".2" />
      <Path fill="#235CFF" d="M220 320v43l-43-43z" opacity=".2" />
      <Path
        fill="#235CFF"
        d="M220 320v73l-43-73zM48 260L220 58v242H108z"
        opacity=".2"
      />
      <Path fill="#235CFF" d="M48 260L220 88v232H108z" />
    </G>
  </Svg>
);

export default Score;
