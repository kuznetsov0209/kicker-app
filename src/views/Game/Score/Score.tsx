import { observer } from "mobx-react";
import { Instance, SnapshotOrInstance } from "mobx-state-tree";
import React, { Component } from "react";
import { Text, View } from "react-native";
import QRCode from "react-qr-code";
import Button from "../../../components/Button";
import Game from "../../../store/game";
import GoalIcon from "./assets/GoalIcon";
import ScoreIcon from "./assets/ScoreIcon";
import styles from "./Score.styles";

const QR_LINK = "https://kicker.mercdev.com/player-selection";
interface ScoreProps {
  game?: Instance<typeof Game> | null;
  isReadyToStart: boolean;
  onStartRequest: () => void;
}

@observer
class Score extends Component<ScoreProps> {
  render() {
    const { game, isReadyToStart, onStartRequest } = this.props;

    return (
      <React.Fragment>
        <View style={styles.score} pointerEvents="none">
          <ScoreIcon />
        </View>
        <View style={styles.score} pointerEvents="none">
          {game && (
            <View style={styles.scoreContainer}>
              <View style={styles.scoreTextContainer}>
                <Text style={[styles.scoreShadow, styles.scoreShadowLeft]}>
                  {game.redScore}
                </Text>
                <Text style={styles.scoreText}>{game.redScore}</Text>
              </View>

              <View style={styles.scoreTextContainer}>
                <Text style={[styles.scoreShadow, styles.scoreShadowRight]}>
                  {game.blueScore}
                </Text>
                <Text style={styles.scoreText}>{game.blueScore}</Text>
              </View>
            </View>
          )}
          {game && Boolean(game.redScore || game.blueScore) && (
            <GoalIcon key={game.score} />
          )}
        </View>

        {isReadyToStart && !game && (
          <View style={styles.startButton}>
            <Button
              primary
              color="white"
              style={{ width: 240 }}
              onPress={onStartRequest}
            >
              START
            </Button>
          </View>
        )}
        {!isReadyToStart && !game && (
          <View style={styles.qrcode}>
            <QRCode
              value={QR_LINK}
              size={210}
              bgColor="#fff"
              fgColor="#191919"
            />
          </View>
        )}
      </React.Fragment>
    );
  }
}

export default Score;
