import React, { Component, ComponentProps } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

interface Props extends ComponentProps<typeof QRCodeScanner> {}

export default class QRScanner extends Component<Props> {
  render() {
    return (
      <QRCodeScanner
        cameraType="front"
        showMarker={true}
        topContent={
          <Text style={styles.centerText}>
            Можно отсканировать QR-код из приложения Mercury Team
          </Text>
        }
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  }
});
