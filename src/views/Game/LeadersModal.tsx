import React, { Component, ComponentProps } from "react";
import { View, Modal } from "react-native";
import WebView from "react-native-webview";
import Navbar, { NavbarLink } from "../../components/Navbar";

interface Props extends ComponentProps<typeof Modal> {}

class LeadersModal extends Component<Props> {
  render() {
    return (
      <Modal animationType="fade" transparent={true} {...this.props}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#191919",
            paddingTop: 20
          }}
        >
          <WebView
            style={{
              flex: 1,
              backgroundColor: "transparent"
            }}
            source={{ uri: "https://kicker.mercdev.com/app" }}
          />
          <Navbar>
            <NavbarLink title="GAME" onPress={this.props.onRequestClose} />
            <NavbarLink title="LEADERS" active />
          </Navbar>
        </View>
      </Modal>
    );
  }
}

export default LeadersModal;
