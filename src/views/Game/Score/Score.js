import React, { Component } from "react";
import { View, Text } from "react-native";
import { observer } from "mobx-react";
import {
  TEAM_RED,
  TEAM_BLUE,
  POSITION_FORWARD,
  POSITION_DEFENDER
} from "../../../constants";
import Button from "../../../components/Button";
import Logo from "../../../assets/Logo";
import LogoArea from "./assets/LogoArea";
import ScoreIcon from "./assets/ScoreIcon";
import GoalIcon from "./assets/GoalIcon";
import styles from "./Score.styles";

const Score = observer(
  class ScoreComponent extends Component {
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
          {!isReadyToStart && !game && <LogoArea style={styles.logoArea} />}
          {!isReadyToStart && !game && <Logo style={styles.logo} />}
        </React.Fragment>
      );
    }
  }
);

export default Score;
