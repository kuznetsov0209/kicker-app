import React, { Component } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

import IconCross from "../../../../assets/IconCross";
import QRCode from "react-qr-code";
import styles from "./QRCodeModal.styles";
import { TEAM_RED, POSITION_DEFENDER } from "../../../../constants";
import EventSource, { MessageEvent } from "react-native-sse";
import { API_HOST } from "../../../../api";

interface QRCodeModalProps {
  close: () => void;
  visible: boolean;
  team: number;
  position: number;
}

class QRCodeModal extends Component<QRCodeModalProps> {
  close = () => {
    this.props.close();
  };

  eventSourceMessageHandler = (event: MessageEvent) => {
    this.close();
  };
  gameEventSource = new EventSource(`${API_HOST}/api/active-game/events`);

  componentDidMount() {
    this.gameEventSource.addEventListener(
      "message",
      this.eventSourceMessageHandler
    );
  }

  componentWillUnmount() {
    this.gameEventSource.removeEventListener(
      "message",
      this.eventSourceMessageHandler
    );
  }

  render() {
    const { visible, team, position } = this.props;

    return (
      <Modal animationType="fade" transparent={false} visible={visible}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#191919",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={this.close}
            style={{
              position: "absolute",
              right: 30,
              top: 30,
              zIndex: 2
            }}
          >
            <IconCross />
          </TouchableOpacity>
          <Text
            style={[
              {
                color: team === TEAM_RED ? "#ff234a" : "#235cff"
              },
              styles.teamText
            ]}
          >
            {team === TEAM_RED ? "TEAM RED" : "TEAM BLUE"}
          </Text>
          <Text
            style={[
              {
                color: team === TEAM_RED ? "#ff234a" : "#235cff"
              },
              styles.positionText
            ]}
          >
            {position === POSITION_DEFENDER ? "DEFENDER" : "FORWARD"}
          </Text>

          <View style={styles.qrCode}>
            <QRCode
              value={`https://kicker.mercdev.com/player-selection?team=${team}&position=${position}`}
              size={280}
              bgColor="#fff"
              fgColor="#191919"
            />
          </View>
          <Text style={styles.infoText}>
            Отсканируй QR-код чтобы добавить себя как участника и участвовать в
            розыгрыше приза.
          </Text>
        </View>
      </Modal>
    );
  }
}

export default QRCodeModal;
