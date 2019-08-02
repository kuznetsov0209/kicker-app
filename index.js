import { AppRegistry } from "react-native";
import codePush from "react-native-code-push";

import App from "./src/App";

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE
};

AppRegistry.registerComponent("kickermasterapp", () => App);
