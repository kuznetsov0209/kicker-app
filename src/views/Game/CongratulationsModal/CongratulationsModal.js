import React, { Component } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { observer } from "mobx-react";

import Button from "../../../components/Button";
import UserAvatar from "../../../components/UserAvatar";
import { TEAM_BLUE } from "../../../constants";
import { gameStore } from "../../../store";

import Stars from "./assets/Stars";

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

const CongratulationsModal = observer(
  class CongratulationsModalComponent extends Component {
    render() {
      const { game } = gameStore;
      const { visible, onRematch, onFinish } = this.props;

      return (
        <Modal animationType="fade" transparent={true} visible={visible}>
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
                height: 758,
                backgroundColor:
                  game.winnerTeam === TEAM_BLUE ? "#235cff" : "#ff234a",
                borderRadius: 6,
                alignItems: "center"
              }}
            >
              <View style={{ marginTop: 40 }}>
                <Stars />
              </View>
              <View style={{ flexDirection: "row", marginTop: -80 }}>
                <View style={[styles.avatar, styles.avatarLeft]}>
                  <UserAvatar user={game.winnerPlayers[0]} size={60} />
                </View>
                <View style={[styles.avatar, styles.avatarRight]}>
                  <UserAvatar user={game.winnerPlayers[1]} size={60} />
                </View>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{
                    fontSize: 48,
                    fontFamily: "GothamPro-Black",
                    textAlign: "center",
                    color: "white"
                  }}
                >
                  Congratulations
                </Text>
                <Text
                  style={{
                    marginTop: 47,
                    fontSize: 86,
                    fontFamily: "GothamPro-Black",
                    textAlign: "center",
                    color: "white"
                  }}
                >
                  {game.score}
                </Text>
              </View>
              <View style={{ marginTop: 80 }}>
                <Button
                  primary
                  color="white"
                  style={{ width: 280 }}
                  onPress={onRematch}
                >
                  REMATCH
                </Button>
              </View>
              <View style={{ marginTop: 30 }}>
                <Button color="white" style={{ width: 280 }} onPress={onFinish}>
                  FINISH GAME
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      );
    }
  }
);

export default CongratulationsModal;
