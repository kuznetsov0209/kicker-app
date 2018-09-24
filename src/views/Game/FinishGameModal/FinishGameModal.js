import React, { Component } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { observer } from "mobx-react";

import IconCross from "../../../assets/IconCross";
import Button from "../../../components/Button";

const FinishGameModal = observer(
  class FinishModalComponent extends Component {
    render() {
      const { visible, onRequestClose, onFinish } = this.props;
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
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                width: 560,
                height: 548,
                backgroundColor: "#191919",
                borderRadius: 6,
                alignItems: "center",
                paddingLeft: 60,
                paddingRight: 60
              }}
            >
              <TouchableOpacity
                onPress={onRequestClose}
                style={{
                  position: "absolute",
                  right: 27.5,
                  top: 27.5,
                  zIndex: 2
                }}
              >
                <IconCross />
              </TouchableOpacity>

              <Text
                style={{
                  marginTop: 80,
                  fontSize: 48,
                  fontFamily: "GothamPro-Black",
                  textAlign: "center",
                  color: "white"
                }}
              >
                Finish game
              </Text>
              <Text
                style={{
                  marginTop: 32,
                  fontSize: 32,
                  fontFamily: "GothamPro-Black",
                  textAlign: "center",
                  color: "white"
                }}
              >
                Are you sure you want to finish game?
              </Text>
              <View style={{ marginTop: 85 }}>
                <Button primary color="#235cff" width={280} onPress={onFinish}>
                  FINISH GAME
                </Button>
              </View>
              <View style={{ marginTop: 30 }}>
                <Button color="#ff234a" width={280}>
                  CANCEL
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      );
    }
  }
);

export default FinishGameModal;
