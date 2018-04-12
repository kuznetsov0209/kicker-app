import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet
} from "react-native";
import { observer } from "mobx-react";

import Button from "../components/Button";
import UserAvatar from "../components/UserAvatar";
import { store } from "../store";
import IconCross from "./svg/IconCross";
import Stars from "./svg/Stars";

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
    overflow: "hidden"
  },
  avatarLeft: {
    marginRight: -7
  },
  avatarRight: {
    marginLeft: -7
  }
});

const FinishModal = observer(
  class extends Component {
    render() {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={this.props.onRequestClose}
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
                onPress={this.props.onRequestClose}
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
                <Button primary color="#235cff" width={280}>
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

export default FinishModal;
