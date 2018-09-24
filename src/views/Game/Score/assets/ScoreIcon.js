import React from "react";
import { WebView } from "react-native";

const WIDTH = 440;
const HEIGHT = 520;

const Score = props => (
  <WebView
    style={{
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: "transparent"
    }}
    source={{
      html: `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="100%"
          viewBox="0 0 440 520"
        >
          <style>
            @keyframes center-img8_t { 0% { transform: translate(392px,260px) scale(1,1) translate(-392px,-260px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 50% { transform: translate(392px,260px) scale(1,1.2) translate(-392px,-260px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 100% { transform: translate(392px,260px) scale(1,1) translate(-392px,-260px); } }
            @keyframes center-img6_t { 0% { transform: translate(220px,200px) scale(1,1) translate(-220px,-200px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 41.9689% { transform: translate(220px,200px) scale(1.6,0.6) translate(-220px,-200px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 100% { transform: translate(220px,200px) scale(1,1) translate(-220px,-200px); } }
            @keyframes center-img5_t { 0% { transform: translate(220px,200px) scale(1.6,1) translate(-220px,-200px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 50% { transform: translate(220px,200px) scale(1,1.6) translate(-220px,-200px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 100% { transform: translate(220px,200px) scale(1.6,1) translate(-220px,-200px); } }
            @keyframes center-img3_t { 0% { transform: translate(220px,320px) scale(1,1) translate(-220px,-320px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 41.9689% { transform: translate(220px,320px) scale(1.6,0.6) translate(-220px,-320px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 100% { transform: translate(220px,320px) scale(1,1) translate(-220px,-320px); } }
            @keyframes center-img2_t { 0% { transform: translate(48px,260px) scale(1,1) translate(-48px,-260px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 50% { transform: translate(48px,260px) scale(1,1.2) translate(-48px,-260px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 100% { transform: translate(48px,260px) scale(1,1) translate(-48px,-260px); } }
            @keyframes center-img1_t { 0% { transform: translate(220px,320px) scale(1.6,1) translate(-220px,-320px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 50% { transform: translate(220px,320px) scale(1,1.6) translate(-220px,-320px); animation-timing-function: cubic-bezier(0.42,0,0.58,1); } 100% { transform: translate(220px,320px) scale(1.6,1) translate(-220px,-320px); } }
          </style>
          <path id="center-img8" fill="#235CFF" d="M392,260L220,462L220,220L332,220Z" opacity="0.2" fill-rule="evenodd" transform="translate(392,260) translate(-392,-260)" style="animation: center-img8_t 4s linear infinite both;"/>
          <path id="center-img7" fill="#235CFF" d="M392,260L220,432L220,200L332,200Z" fill-rule="evenodd" transform="translate(220,200) translate(-220,-200)"/>
          <path id="center-img6" fill="#235CFF" d="M220,200L220,127L263,200Z" opacity="0.2" fill-rule="evenodd" transform="translate(220,200) translate(-220,-200)" style="animation: center-img6_t 6.433s linear infinite both;"/>
          <path id="center-img5" fill="#235CFF" d="M220,200L220,157L263,200Z" opacity="0.2" fill-rule="evenodd" transform="translate(220,200) scale(1.6,1) translate(-220,-200)" style="animation: center-img5_t 7s linear infinite both;"/>
          <path id="center-img4" fill="#FF234A" d="M48,260L220,88L220,320L108,320Z" fill-rule="evenodd" transform="translate(220,320) translate(-220,-320)"/>
          <path id="center-img3" fill="#FF234A" d="M220,320L220,393L177,320Z" opacity="0.2" fill-rule="evenodd" transform="translate(220,320) translate(-220,-320)" style="animation: center-img3_t 6.433s linear infinite both;"/>
          <path idÎ="center-img2" fill="#FF234A" d="M48,260L220,58L220,300L108,300Z" opacity="0.2" fill-rule="evenodd" transform="translate(48,260) translate(-48,-260)" style="animation: center-img2_t 4s linear infinite both;"/>
          <path id="center-img1" fill="#FF234A" d="M220,320L220,363L177,320Z" opacity="0.2" fill-rule="evenodd" transform="translate(220,320) scale(1.6,1) translate(-220,-320)" style="animation: center-img1_t 7s linear infinite both;"/>
        </svg>
      `
    }}
  />
);

export default Score;
