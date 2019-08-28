import React, { Component } from "react";
import { View, Modal, WebView, TouchableOpacity } from "react-native";
import Navbar, { NavbarLink } from "../../components/Navbar";
import IconCross from "../../assets/IconCross";

class LeadersModal extends Component {
  render() {
    const { visible, onRequestClose } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
      >
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
            source={{ uri: "http://localhost:8082" }}
          />
          <Navbar>
            <NavbarLink title="GAME" onPress={onRequestClose} />
            <NavbarLink title="LEADERS" active />
          </Navbar>
        </View>
      </Modal>
    );
  }
}

export default LeadersModal;
