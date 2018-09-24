import React from "react";
import { View } from "react-native";

import Game from "./views/Game";
import { GatewayDest, GatewayProvider } from "react-gateway";

export default function App() {
  return (
    <GatewayProvider>
      <Game />
      <GatewayDest name="navbar" component={View} />
    </GatewayProvider>
  );
}
