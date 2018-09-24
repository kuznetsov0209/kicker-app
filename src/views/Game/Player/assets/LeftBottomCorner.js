import React from "react";
import { WebView } from "react-native";

const WIDTH = 280;
const HEIGHT = 280;

const LeftBottomCorner = ({ style }) => (
  <WebView
    style={[
      {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "transparent"
      },
      style
    ]}
    source={{
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 280 280">
          <g fill="none" fill-rule="evenodd">
            <path fill="#FF234A" d="M176 280H0V46l176 234z" opacity=".2" />
            <path fill="#FF234A" d="M234 280H0V104z" opacity=".2" />
            <g stroke="#FFF">
              <g stroke-width="10" opacity=".05" transform="translate(24 231)">
                <circle cx="17" cy="8" r="8" />
                <path d="M16.957 4.488l3.329 2.418-1.271 3.913H14.9l-1.271-3.913z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.5 6.5l-4 4M19.5 16.5l-4 4M9.5 19.5L.486 28.514M9.5 11.5l-7.018 7.018" />
                <path stroke-linecap="square" d="M17 .5v4" />
              </g>
              <g stroke-width="5" opacity=".1" transform="translate(24 231)">
                <circle cx="17" cy="8" r="8" />
                <path d="M16.957 4.488l3.329 2.418-1.271 3.913H14.9l-1.271-3.913z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.5 6.5l-4 4M19.5 16.5l-4 4M9.5 19.5L.486 28.514M9.5 11.5l-7.018 7.018" />
                <path stroke-linecap="square" d="M17 .5v4" />
              </g>
              <g stroke-width="1.5" transform="translate(24 231)">
                <circle cx="17" cy="8" r="8" />
                <path d="M16.957 4.488l3.329 2.418-1.271 3.913H14.9l-1.271-3.913z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.5 6.5l-4 4M19.5 16.5l-4 4M9.5 19.5L.486 28.514M9.5 11.5l-7.018 7.018" />
                <path stroke-linecap="square" d="M17 .5v4" />
              </g>
            </g>
          </g>
        </svg>
      `
    }}
  />
);

export default LeftBottomCorner;
